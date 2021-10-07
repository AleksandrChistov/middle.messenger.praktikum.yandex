export default function putSvgIcons() {
    const allSvgIcons = document.querySelectorAll('icon');

    const addClass = (classList, span) => {
        if (classList.length) {
            span.classList.add(...classList);
        }
    }

    const createElement = (svgIcon) => {
        const span = document.createElement('span');
        addClass(svgIcon.classList, span);
        span.innerHTML = icons[svgIcon.id];
        return span;
    }

    [...allSvgIcons]
        .filter(svgIcon => icons[svgIcon.id])
        .forEach(svgIcon => {
            const iconReady = createElement(svgIcon);
            svgIcon.replaceWith(iconReady);
        })
}

const icons = {
    'arrow-back': `<svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1416 7.9042C17.1416 8.17711 17.0287 8.43885 16.8278 8.63183C16.6269 8.82481 16.3545 8.93322 16.0704 8.93322L3.65906 8.93322L8.25893 13.3498C8.46008 13.543 8.57309 13.8051 8.57309 14.0783C8.57309 14.3516 8.46008 14.6137 8.25893 14.8069C8.05778 15.0001 7.78497 15.1087 7.5005 15.1087C7.21603 15.1087 6.94321 15.0001 6.74207 14.8069L0.314664 8.63275C0.214903 8.53716 0.135756 8.42361 0.0817515 8.29859C0.0277487 8.17357 -5.08551e-05 8.03955 -5.08427e-05 7.9042C-5.08304e-05 7.76885 0.0277488 7.63482 0.0817516 7.50981C0.135756 7.38479 0.214904 7.27124 0.314664 7.17565L6.74207 1.0015C6.94322 0.808276 7.21603 0.699725 7.5005 0.699725C7.78497 0.699725 8.05778 0.808276 8.25893 1.0015C8.46008 1.19472 8.57309 1.45679 8.57309 1.73005C8.57309 2.00331 8.46008 2.26538 8.25893 2.4586L3.65906 6.87517L16.0704 6.87517C16.3545 6.87517 16.6269 6.98359 16.8278 7.17657C17.0287 7.36955 17.1416 7.63128 17.1416 7.9042Z" fill="#7364FF"/>
                   </svg>
                   `,
    'escape': `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.3311 7.29883L20.2467 10.7982L17.3311 7.29883Z" stroke="#7364FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M17.3311 14.2977L20.2467 10.7983L17.3311 14.2977Z" stroke="#7364FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M18.4968 10.7983H9.39844" stroke="#7364FF" stroke-width="2" stroke-linecap="round"/>
                    <path d="M1 1H13.5977" stroke="#7364FF" stroke-width="2" stroke-linecap="round"/>
                    <path d="M1 20.5965H13.5977" stroke="#7364FF" stroke-width="2" stroke-linecap="round"/>
                    <path d="M13.5979 1V6.599" stroke="#7364FF" stroke-width="2" stroke-linecap="round"/>
                    <path d="M13.5979 14.9975V20.5965" stroke="#7364FF" stroke-width="2" stroke-linecap="round"/>
                    <path d="M1 1V20.5965" stroke="#7364FF" stroke-width="2" stroke-linecap="round"/>
                </svg>
                `
}
