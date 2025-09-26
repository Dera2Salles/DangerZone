import image_genZ from "./asset/GenZ.jpg"
export const Accueil= ()=> {
  return (
    <div className="max-w-2xl mx-auto p-6 ">
      <div className="flex flex-col items-center text-center">
        <div className="w-48 h-48 mb-6">
          <img 
            src={image_genZ} 
            alt="DangerZone Logo"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        
        <h1 className="text-4xl font-bold text-black mb-6">
          DangerZone
        </h1>
        
        <div className="text-gray-700 text-sm leading-relaxed space-y-4">
          <p>
            DangerZonze dia fomba iray ahafahano mamantatra ny tahan'ny fahalemana eny amin ny faritra iray, manolona ny korotana vokatrin'ny grevy, sady ihany koa mba ahafahana manampy ireo olona mataotra ny hivoka ny trano fonenany.
          </p>
          <p>
            Ny fampiasana azy dia tsotra kely. Rah ao anatin ireo lisitrireo faritra etsy ambany ny faritra misy anao dia, afaka tsindihinao araka ny toedrahana miseo any. Fanazavana fanampiny etsy.
          </p>
        </div>
      </div>
    </div>
  );
}