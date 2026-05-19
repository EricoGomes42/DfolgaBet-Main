interface AdBannerProps {
  imageUrl?: string;
  href?: string;
  imageAlt?: string;
  slotId?: string;
  className?: string;
  isSidebar?: boolean;
  iframeHtml?: string;
}

export default function AdBanner({ imageUrl, href, imageAlt, slotId = 'Content1', className, isSidebar = false, iframeHtml }: AdBannerProps) {
  return (
    <div className={className !== undefined ? className : "mb-10 text-center"}>
      <div className={className !== undefined ? "overflow-hidden flex justify-center" : "border border-[#50c0cc] rounded-2xl bg-white overflow-hidden flex justify-center"}>
        {iframeHtml ? (
          <div 
            className="w-full flex justify-center overflow-hidden [&>iframe]:w-full [&>iframe]:h-[90px] md:[&>iframe]:h-auto md:[&>iframe]:aspect-[728/90]" 
            dangerouslySetInnerHTML={{ __html: iframeHtml }} 
          />
        ) : imageUrl && href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="w-full flex justify-center hover:opacity-90 transition-opacity">
            <img src={imageUrl || undefined} alt={imageAlt || "Anúncio"} className="w-full h-auto object-contain" />
          </a>
        ) : imageUrl && !href ? (
          <div className="w-full flex justify-center">
            <img src={imageUrl || undefined} alt={imageAlt || "Anúncio"} className="w-full h-auto object-contain" />
          </div>
        ) : (
          <div className={`w-full flex justify-center py-4 lg:py-6 overflow-hidden ${className !== undefined ? '' : 'bg-gray-50/50'}`}>
            <div className={`adx-wrapper-${slotId} flex items-center justify-center shrink-0`}>
              <style>
                {`
                  .adx-wrapper-${slotId} {
                    width: ${isSidebar ? '100%' : '728px'} !important;
                    height: ${isSidebar ? '250px' : '90px'} !important;
                    max-width: 100% !important;
                    margin: 0 auto;
                    overflow: hidden;
                    background-color: #f3f4f6;
                    border-radius: 4px;
                  }
                  .adx-wrapper-${slotId} > div {
                    width: 100% !important;
                    height: 100% !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                  }
                  .adx-wrapper-${slotId} ins {
                    width: 100% !important;
                    height: 100% !important;
                    display: block !important;
                  }
                `}
              </style>
              <div 
                className="w-full text-center text-sm text-gray-400 border border-dashed border-gray-300"
                {...{"joinadscode": slotId, "lazyload": "true"}} 
              >
                Espaço reservado Joinads / Adsense ({slotId})
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
