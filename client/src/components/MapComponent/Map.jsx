import React, { useEffect, useState } from 'react';
import './MapComponent.css';
import { useParams } from 'react-router-dom';

function Map({ remuveMap, orderInDelivery }) {
  const [isMap, setIsMap] = useState(false);
  const { id } = useParams();
  const [geo, setGeo] = useState();
  // const [coordinates, setCoordinates] = useState();
  const coordinatesToNumber = (coordinates) =>
    coordinates?.map((el) => Number(el));

  useEffect(() => {
    // setCoordinates(coordinatesToNumber());
    const findClass = document.querySelector('.ymaps-2-1-79-map');

    if (!remuveMap) {
      if (findClass) document.querySelector('#map').removeChild(findClass);
    }

    const oldMap = document.querySelector('.ymaps-2-1-79-map');
    if (!oldMap) {
      const script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.src =
        'https://api-maps.yandex.ru/2.1.78/?apikey=24c18903-4f64-4649-87e4-d2621aa227b9&lang=ru_RU';
      script.async = true;

      document.body.appendChild(script);
      script.onload = () => {
        ymaps.ready(init);
        function init() {
          var map;
          ymaps.geolocation.get().then(function (res) {
            setGeo(res.geoObjects.position);
            // console.log(res.geoObjects.position);
          });

          var myMap = new ymaps.Map(
              'map',
              {
                center: [59.70257936760503, 30.3656016400904],
                zoom: 10,
              },
              {
                searchControlProvider: 'yandex#search',
              }
            ),
            collection = new ymaps.GeoObjectCollection(null, {
              preset: 'islands#yellowIcon',
            }),
            clinCoordinats = [];

          if (orderInDelivery.length > 0) {
            for (var i = 0, l = orderInDelivery.length; i < l; i++) {
              const { coordinates, new_order_price, discount } =
                orderInDelivery[i];
              clinCoordinats.push(coordinatesToNumber(coordinates));
              collection.add(new ymaps.Placemark(clinCoordinats[i]));
            }
          }

          if (clinCoordinats?.length > 0) {
            for (var i = 0, l = clinCoordinats.length; i < l; i++) {
              collection.add(new ymaps.Placemark(clinCoordinats[i]));
            }
          }

          // if (orderInDelivery.length > 0) {
          //   orderInDelivery?.forEach((order) => {
          //     const { coordinates, new_order_price, discount } = order;
          //     console.log(coordinatesToNumber(coordinates));
          //     collection.add(
          //       new ymaps.Placemark(coordinatesToNumber(coordinates))
          //     );
          //   });
          // }
          myMap.geoObjects?.add(collection);

          // const collection = new ymaps.GeoObjectCollection(null, {
          //   preset: 'islands#governmentCircleIcon',
          //   iconColor: 'red',
          // });

          //   myMap.geoObjects.add(collection).add(
          //     new ymaps.Placemark(
          //       [55.826479, 37.487208],
          //       {
          //         balloonContent: 'цвет <strong>фэйсбука</strong>',
          //       },
          //       {
          //         preset: 'islands#governmentCircleIcon',
          //         iconColor: 'red',
          //       }
          //     )
          //   );
        }
      };
      // Удаляем скрипт при размонтировании компонента
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [id]);

  return (
    <div
      id='map'
      className='map1'
      // style={{ height: '400px' }}
    ></div>
  );
}

export default Map;
