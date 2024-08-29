


import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const MapComponent = () => {
  useEffect(() => {
    const loadYmaps = async () => {
      const ymaps3 = await import('https://api-maps.yandex.com/3.0/?lang=ru_RU');
      const ymaps3Reactify = await ymaps3.import('@yandex/ymaps3-reactify');
      const reactify = ymaps3Reactify.reactify.bindTo(React, ReactDOM);
      const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = reactify.module(ymaps3);

      // Создаем корневой элемент для карты
      const mapContainer = document.getElementById('map-container');
      ReactDOM.Renderer(
        <YMap location={{ center: [25.229762, 55.289311], zoom: 9 }} mode="vector">
          <YMapDefaultSchemeLayer />
          <YMapDefaultFeaturesLayer />
          <YMapMarker coordinates={[25.229762, 55.289311]} draggable={true}>
            <section>
              <h1>You can drag this header</h1>
            </section>
          </YMapMarker>
        </YMap>,
        mapContainer
      );
    };

    loadYmaps();
  }, []);

  return <div id="map-container" style={{ width: '100%', height: '100px' }} />;
};

export default MapComponent;
