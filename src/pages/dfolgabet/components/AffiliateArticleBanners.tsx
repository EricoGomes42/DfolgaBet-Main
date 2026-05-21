const affiliateLinks = {
  lottoland: "https://track.levanteaffiliates.com.br/visit/?bta=73332&brand=lottoland",
  sorteOnline: "https://track.levanteaffiliates.com.br/visit/?bta=73332&brand=sorteonline",
};

export default function AffiliateArticleBanners() {
  return (
    <div className="my-8 space-y-5">
      <a
        href={affiliateLinks.lottoland}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        className="block"
      >
        <img
          src="/assets/banners/banner_lottoland_728x90.png"
          alt="Lottoland - publicidade para maiores de 18 anos"
          className="w-full max-w-[728px] mx-auto rounded-xl shadow-lg hover:scale-[1.01] transition-transform duration-300"
        />
      </a>

      <a
        href={affiliateLinks.sorteOnline}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        className="block"
      >
        <img
          src="/assets/banners/banner_sorte_online_728x90.png"
          alt="Sorte Online - publicidade para maiores de 18 anos"
          className="w-full max-w-[728px] mx-auto rounded-xl shadow-lg hover:scale-[1.01] transition-transform duration-300"
        />
      </a>
    </div>
  );
}