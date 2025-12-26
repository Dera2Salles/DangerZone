export class HtmlProcessor {
  static cleanForWordPress(html: string): string {
    // Simple nettoyage pour WordPress
    const cleaned = html
      // Nettoyer les styles inline excessifs
      .replace(/style="[^"]*"/g, (match) => {
        // Garder seulement certains styles
        const keepStyles = ['text-align', 'color', 'background-color'];
        const styles = match.replace('style="', '').replace('"', '').split(';');
        const filtered = styles.filter((style) => {
          const [prop] = style.split(':');
          return keepStyles.includes(prop.trim());
        });
        return filtered.length > 0 ? `style="${filtered.join(';')}"` : '';
      })
      // Ajouter la classe WordPress aux images
      .replace(/<img/g, '<img class="wp-image"')
      // Nettoyer les divs inutiles
      .replace(/<div><\/div>/g, '')
      // Normaliser les sauts de ligne
      .replace(/\n\s*\n/g, '\n');

    return cleaned;
  }

  static extractBase64Images(html: string): string[] {
    const base64Regex = /src="(data:image\/[^;]+;base64[^"]+)"/g;
    const matches: string[] = [];
    let match;

    while ((match = base64Regex.exec(html)) !== null) {
      matches.push(match[1]);
    }

    return matches;
  }

  static replaceBase64(html: string, base64: string, url: string): string {
    return html.replace(`src="${base64}"`, `src="${url}"`);
  }
}
