const MapComponent = () => {
    const latitude = 27.207348; // عرض جغرافیایی
    const longitude = 56.341015; // طول جغرافیایی
  
    return (
      <div className="w-full">
        <div className="w-full h-56 rounded-lg overflow-hidden">
          <iframe
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${longitude-0.01}%2C${latitude-0.01}%2C${longitude+0.01}%2C${latitude+0.01}&layer=mapnik&marker=${latitude},${longitude}`}
            width="100%"
            height="100%"
            className="border-0"
            loading="lazy"
            title="موقعیت مکانی"
          ></iframe>
        </div>
      </div>
    );
  };
  
  export default MapComponent;
  