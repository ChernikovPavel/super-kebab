import React, { useEffect, useState } from 'react';
import './MapComponent.css';
import { useParams, useNavigate } from 'react-router-dom';
import OrderCard from '../Cards/OrderCard';

function Map({ remuveMap, orderInDelivery }) {
  const [isMap, setIsMap] = useState(false);
  const { id } = useParams();
  // const [geo, setGeo] = useState();
  const navigate = useNavigate();
  const coordinatesToNumber = (coordinates) =>
    coordinates?.map((el) => Number(el));
  console.log(orderInDelivery);

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
          var myMap = new ymaps.Map(
            'map',
            {
              center: [59.70257936760503, 30.3656016400904],
              zoom: 10,
            },
            {
              searchControlProvider: 'yandex#search',
            }
          );

          if (Array.isArray(orderInDelivery) && orderInDelivery.length > 0) {
            orderInDelivery.forEach((order) => {
              const { id, coordinates, new_order_price } = order;

              const placemark = new ymaps.Placemark(
                coordinates,
                {
                  balloonContent:
                    `Этот заказ может быть Вашб всего за:' ${new_order_price}` ||
                    'Информация о заказе', // Измените на нужное значение
                },
                {
                  preset: 'islands#governmentCircleIcon',
                  iconColor: 'red',
                }
              );

              placemark.events.add('click', () => {
                navigate(`/order/${id}`); // Переход на страницу
              });
              myMap.geoObjects.add(placemark);
            });
          }
        }
      };

      // Удаляем скрипт при размонтировании компонента
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [orderInDelivery]);

  return <div id='map' className='map1'></div>;
}

export default Map;
