(function () {
    let notification_cookie = getCookie('notification_cookie');                                     // куки - показывалось ли уже уведомление

    if (!notification_cookie) {
        let class_notification_body = 'notification-cookie';                                        // css для тела уведомления
        let class_notification_txt = 'notification-cookie-txt';                                     // css для текста уведомления
        let class_notification_btn = 'notification-cookie-btn';                                     // css для кнопки
        let class_notification_link = 'notification-cookie-link'                                    // css для ссылок
        let max_age = 157788000;                                                                    // время жизни куки
		let link_policy = '/terms';																	// ссылка на политику
		let link_accord = '/soglasie-obrabotki-personalnyix-dannyix';								// ссылка на согласие

        // тело уведомления
        let notification = `<div class="${class_notification_body}"><p class="${class_notification_txt}">Сайт использует куки. Продолжая им пользоваться, вы соглашаетесь на обработку данных в соответствии с: <a target="_blank" class="${class_notification_link}" href="${link_policy}">Политикой обработки персональных данных</a> и <a target="_blank" class="${class_notification_link}" href="${link_accord}">Согласием на обработку персональных данных</a>.</p> <button class="${class_notification_btn}">OK</button></div>`;

        show_notification(notification);                                                            // показать уведомление
        init_notification_btn(class_notification_btn, class_notification_body, max_age);            // найти кнопку в уведомлении
    }

    function show_notification(element) { document.body.insertAdjacentHTML('beforeend', element); }     // ! показать уведомление

    function init_notification_btn(class_btn, class_body, max_age) {                                    // ! найти кнопку в уведомлении и повесить обработчик
        let notification_body = document.querySelector(`.${class_btn}`);                                                                   // найти
        if (notification_body) { notification_body.addEventListener('click', () => { notification_hide(`.${class_body}`, max_age); }) }    // если найдена, повесить обработчик
    }

    function notification_hide(class_element, max_age) {                                            // ! удалить уведомление и создать куку
        let element = document.querySelector(class_element);

        if (element) {
            element.remove();                                                                       // удалить
            establish_cookie(max_age);                                                              // создать куку, чтобы не показывать уведомление
        }
    }

    function establish_cookie(sec) { document.cookie = `notification_cookie=true; max-age=${sec}`; }    // ! создать куку

    function getCookie(name) {                                                                          // ! найти куку
        let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
})();