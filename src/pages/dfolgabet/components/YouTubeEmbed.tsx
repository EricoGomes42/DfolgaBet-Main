export const YouTubeEmbed = ({ videoId }: { videoId: string }) => {
  return (
    <div className="not-prose w-full block my-8 flex-shrink-0" style={{ display: 'block' }}>
      <div 
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '56.25%',
          height: 0,
          overflow: 'hidden',
          borderRadius: '20px',
          backgroundColor: '#000',
          display: 'block'
        }}
      >
        <iframe
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 0
          }}
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};
