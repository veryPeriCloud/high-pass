document.addEventListener('DOMContentLoaded', function () {

  const validation1 = new JustValidate('.about__form');
  const validation2 = new JustValidate('.contacts__form', {
    errorContainer: '.contacts__input'
  });
  validation1
    .addField('.about__form-input', [
      {
        rule: 'required',
        errorMessage: 'Недопустимый формат',
      },
      {
        rule: 'email',
        errorMessage: 'Недопустимый формат',
      },
    ]);

  validation2
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Введите имя',
      },
      {
        rule: 'minLength',
        value: 2,
      },
      {
        rule: 'maxLength',
        value: 30,
      },
      {
        rule: 'customRegexp',
        value: /[A-Za-zА-Яа-яЁё]/,
      },
    ])
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Недопустимый формат',
      },
      {
        rule: 'email',
        errorMessage: 'Недопустимый формат',
      },
    ]);


  ymaps.ready(init);
  function init() {
    var myMap = new ymaps.Map('map', {
      center: [55.769535, 37.639985],
      zoom: 15,
      controls: [],
    },
      {
        searchControlProvider: 'yandex#search'
      });
    var myGeoObject = new ymaps.GeoObject({
      geometry: {
        type: "Point", // тип геометрии - точка
        coordinates: [55.769535, 37.639985] // координаты точки
      }
    });
    var myPlacemark;
    myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
    },
      {
        iconLayout: 'default#image',
        iconImageHref: 'img/point.svg',
        iconImageSize: [12, 12],
        iconImageOffset: [0, 0]
      });

    myMap.geoObjects.add(myPlacemark);

    myPlacemark.events.add('click', function () {
      document.querySelector('.contacts__descr').classList.add('contacts__descr--active')
    });
  };


  document.querySelector('.contacts__btn-close').addEventListener('click', () => {
    document.querySelector('.contacts__descr').classList.remove('contacts__descr--active')
  })

  const burger = document.querySelector('.burger');
  const phone = document.querySelector('.header__phone');
  const burgerMenu = document.querySelector('.header__nav-list');

  burger.addEventListener('click', () => {
    burger.classList.toggle('burger--active');
    phone.classList.toggle('header__phone--active')
    burgerMenu.classList.toggle('header__nav-list--active')
  })

  const search = document.querySelector('.header__search-btn');
  const searchForm = document.querySelector('.header__form');
  const close = document.querySelector('.header__btn-close');

  search.addEventListener('click', () => {
    searchForm.classList.add('header__form--active')
  })

  close.addEventListener('click', () => {
    searchForm.classList.remove('header__form--active')
  })

});
