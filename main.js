import './style.css';

import koreLogoExpanded from './images/kore-logo-extended.svg';
import koreLogoCollapsed from './images/kore-logo-collapsed.svg';

import arrowCloseIcon from './images/arrow-close.svg';

import LoginIcon from './images/main-login.svg';


import logoMyDev from './images/logo-mydev.svg';
import arrowRedirect from './images/arrow-redirect.svg';

import serviceDesignedCo from './images/service-designed-co.svg';
import serviceMarketing from './images/service-marketing.svg';
import serviceMerchantProcessing from './images/service-merchant-processing.svg';

import mainHomeIcon from './images/main-home.svg';
import mainCRMIcon from './images/main-crm.svg';
import mainStorageIcon from './images/main-storage.svg';
import mainMyWebsitesIcon from './images/main-my-websites.svg';

import platformsIrevuIcon from './images/platforms-irevu.svg';
import platformsClaritaskIcon from './images/platforms-claritask.svg';
import platformsSendBatIcon from './images/platforms-sendbat.svg';
import platformsIpaymerIcon from './images/platforms-ipaymer.svg';
import platformsConvosioIcon from './images/platforms-convosio.svg';
import platformsClaritickIcon from './images/platforms-claritick.svg';
import platformsUrlessIcon from './images/platforms-urless.svg';
import platformsZuitteIcon from './images/platforms-zuitte.svg';
import platformsMorsixIcon from './images/platforms-morsix.svg';
import platformsAzalyticsIcon from './images/platforms-azalytics.svg';
import platformsPaymentBrokersIcon from './images/platforms-paymentbrokers.svg';

import mainSettingsIcon from './images/main-settings.svg';
import mainBubbleChatIcon from './images/main-bubblechat.svg';


class MenuKorePlus {
    arrService = [];
    loggedIn = false;
    cookies = {};
    platformsList = [];
    servicesList = [];

    currentWebsite = null;
    
    constructor(platformsList,servicesList) {
        this.platformsList = platformsList;
        this.servicesList = servicesList;
        this.currentWebsite = window.location.hostname;
        this.constructorInitAsync();
    }

    async constructorInitAsync() {
        this.body = document.querySelector('body');
        this.location = window.location;
        if (!document.querySelector('.__menu-plus-container__')) {
            this.body.insertAdjacentHTML('afterend', `<div class="__menu-plus-container__"></div>`);
        }
        this.container = document.querySelector('.__menu-plus-container__');
        // this.container.classList.add(this.cleanClass('menu-plus-core-hidden'))
        this.initAttributes();
        this.render = this.renderInit();
        document.dispatchEvent(new CustomEvent('MenuKorePlus:init', { detail: { } }));
        this.toggleSidebar('default-state');
        // this.render.classList.add(this.cleanClass('menu-plus-core-forced-collapsed'));
    }

    setLoggedIn(loggedIn) {
        this.loggedIn = !!loggedIn;
        this.render = this.renderInit();
        document.dispatchEvent(new CustomEvent('MenuKorePlus:login', { detail: { loggedIn:this.loggedIn } }));
    }


    // start line render
    renderInit() {
        if(this.render) this.container.removeChild(this.render);

        let mainMenuLoggedIn = this.loggedIn ? [
            this.componentMainMenu({ img: mainHomeIcon, text: 'Home' ,link: 'https://accounts.kore.co/dashboard' }),
            this.componentMainMenu({ img: mainCRMIcon, text: 'CRM',link: 'https://accounts.kore.co/crm/dashboard' }),
            this.componentMainMenu({ img: mainStorageIcon, text: 'Storage', link: 'https://accounts.kore.co/storage/dashboard' }),
            this.componentMainMenu({ img: mainMyWebsitesIcon, text: 'My Websites', link: 'https://accounts.kore.co/websites' })
        ] : [];





        return this.componentBox([
            this.componentFreeWill({
                'class': this.cleanClass('menu-plus_container_helper-hover')
            }),
            this.componentHeader({ 
                imgOpened: koreLogoExpanded, 
                imgClosed: koreLogoCollapsed, 
                onClickImgClosed: () => {
                    this.toggleSidebar('open');
                },
                arrowClose:arrowCloseIcon,
                onClickArrowClose: () => {
                    // this.toggleSidebar('force-collapsed');
                    this.toggleSidebar('hidden');
                }
            }),
            this.loggedIn ? this.componentTextMenu('ADMIN PANEL',{style:{textAlign:'center'}}) : this.componentMainMenu({ img: LoginIcon, text: 'Log in' , showArrow: false, link:'https://accounts.kore.co/login' }),
            ...mainMenuLoggedIn,
            this.componentDivider(),
            this.componentTextMenu('Services'),
            this.componentBox(this.arrService, { style: { overflowY: 'auto', overflowX: 'hidden' } }),
            this.componentDivider(),
            this.componentTextMenu('Platforms'),
            this.componentBox(this.arrPlatforms, { style: { overflowY: 'auto', overflowX: 'hidden' } }),
            this.componentFlexGrow(1),
            this.loggedIn && this.componentMainMenu({ img: mainSettingsIcon, text: 'Manage Account' , showArrow: false }, { styleImage: {width: '22px',height:'22px'}}),
            this.componentMainMenu({ img: mainBubbleChatIcon, text: 'Support Team' , showArrow: false },{ 
                styleImage: {width:'22px',height:'22px'},
                 style: { marginBottom:'1rem'},
                 onClick: () => {
                    window.postMessage('trig-open','*');
                 }
            }),
        ], {
            class: this.cleanClass([
                'menu-plus-core-collapsed',
                'menu-plus-cored-panel',
            ])
        });

        //menu-plus-core-hidden
    }
    // end line render



    // start line attributes
    initAttributes() {
        this.arrService = this.servicesList.map(item=>{
            return this.componentMenu({
                title: item.title,
                img: item.img,
                shortDesc: item.shortDesc,
                link: item.link
            });
        });

        this.arrPlatforms = this.platformsList.map(item=>{
            return this.componentMenu({
                title: item.title,
                img: item.img,
                shortDesc: item.shortDesc,
                link: item.link
            });
        });
    }
    // end line attributes


    componentFreeWill(attr){
        let divFreeWill = document.createElement(attr?.as ?? 'div');
        for (const [key, value] of Object.entries(attr)) {
            divFreeWill.setAttribute(key,value);
        }
        return divFreeWill;
    }

    componentBox(listComponent, ops = {}) {
        let box = document.createElement('div');
        let style = ops?.style || {};
        for (const [key, value] of Object.entries(style)) {
            box.style[key] = value;
        }
        box.classList.add(this.cleanClass('menu-plus-box'));

        let classes = ops?.class || ops?.classes || [];
        classes = Array.isArray(classes) ? classes : [classes];
        for (let i = 0; i < classes.length; i++) {
            box.classList.add(classes[i]);
        }


        this.container.appendChild(box);
        for (let i = 0; i < listComponent.length; i++) {
            if (!listComponent[i]) continue;
            box.appendChild(listComponent[i]);
        }
        return box;
    }


    componentImg(imgSrc, ops = {}) {
        let img = document.createElement('img');
        img.src = imgSrc;
        let style = ops?.style || {};
        for (const [key, value] of Object.entries(style)) {
            img.style[key] = value;
        }
        let classes = ops?.class || ops?.classes || [];
        classes = Array.isArray(classes) ? classes : [classes];
        for (let i = 0; i < classes.length; i++) {
            img.classList.add(classes[i]);
        }

        let onClickFunc = ops?.onClick || ops?.click || ops?.onClickFunc || ops?.clickFunc || null;
        if (onClickFunc) {
            img.style.cursor = 'pointer';
            img.addEventListener('click', onClickFunc);
        }

        img.classList.add(this.cleanClass('menu-plus-logo'));
        return img;
    }

    componentDivider(ops = {}) {
        let divider = document.createElement('div');
        let style = ops?.style || {};
        for (const [key, value] of Object.entries(style)) {
            divider.style[key] = value;
        }
        divider.classList.add(this.cleanClass('menu-plus-divider'));
        return divider;
    }


    componentTextMenu(text, ops = {}) {
        let textMenu = document.createElement('div');
        textMenu.innerHTML = text;
        let style = ops?.style || {};
        for (const [key, value] of Object.entries(style)) {
            textMenu.style[key] = value;
        }
        textMenu.classList.add(this.cleanClass('menu-plus-text-menu'));
        return textMenu;
    }


    componentMenu({ title, img, shortDesc,link }, ops = {}) {
        let menuBox = document.createElement('div');
        let style = ops?.style || {};
        for (const [key, value] of Object.entries(style)) {
            menuBox.style[key] = value;
        }

        if(link){
            menuBox.addEventListener('click',()=>{
                window.open(link, '_blank');
            });
        }

        let imgMenu = document.createElement('img');
        imgMenu.src = img;
        imgMenu.classList.add(this.cleanClass('menu-plus-images-icon'));
        menuBox.appendChild(imgMenu);

        let titleDiv = document.createElement('div');
        titleDiv.innerHTML = `<div>${title}</div>
        ${shortDesc ? `<span>${shortDesc}</span>` : ''}
        `;
        titleDiv.classList.add(this.cleanClass('menu-plus-title'));
        menuBox.appendChild(titleDiv);

        let arrow = document.createElement('img');
        arrow.src = arrowRedirect;
        arrow.classList.add(this.cleanClass('menu-plus-arrow'));
        menuBox.appendChild(arrow);



        menuBox.classList.add(this.cleanClass('menu-plus-menu'));

        if(this.currentWebsite.includes(title)){
            menuBox.classList.add(this.cleanClass('active-menu'));
        }

        return this.componentBox([menuBox], {
            class: this.cleanClass('menu-plus-offset-c1')
        });
    }

    componentMainMenu({ img, text , showArrow = true, link = null }, ops = {}) {
        const divCont = document.createElement('div');

        if(link){
            divCont.style.cursor = 'pointer';
            divCont.addEventListener('click',()=>{
                window.open(link, '_blank');
            });
        }

        if(ops?.onClick){
            divCont.style.cursor = 'pointer';
            divCont.addEventListener('click',ops.onClick);
        }


        const stylesImgMenu = ops?.styleImg || ops?.styleImage || {};
        const imgMenu = this.componentImg(img, {style: {width: '20px',height: '20px',...stylesImgMenu}});
        divCont.appendChild(imgMenu);

        const textMenu = document.createElement('div');
        textMenu.innerHTML = text;
        textMenu.classList.add(this.cleanClass('main-menu-plus-title'));
        divCont.appendChild(textMenu);

        if(!!showArrow){
            let arrow = document.createElement('img');
            arrow.src = arrowRedirect;
            arrow.classList.add(this.cleanClass('menu-plus-arrow'));
            divCont.appendChild(arrow);
        }

        divCont.classList.add(this.cleanClass('main-menu-plus-offset-c1'));
        let styles = ops?.style || {};
        for (const [key, value] of Object.entries(styles)) {
            divCont.style[key] = value;
        }
        return divCont;
    }


    componentHeader({ imgOpened, imgClosed, onClickImgClosed, arrowClose, onClickArrowClose} , ops = {}){
        const header = document.createElement('div');

        let box = this.componentBox([
            this.componentImg(imgOpened,{ class: this.cleanClass('hide_on_collapse_kore')}),
            this.componentImg(imgClosed,{ onClickFunc: onClickImgClosed, class: this.cleanClass('show_on_collapse_kore')}),
        ],{
            class: this.cleanClass('menu-plus-header-box')
        });

        header.appendChild(box);

        const arrowCloseEle = this.componentImg(arrowClose,{ class: this.cleanClass('hide_on_collapse_kore')});
        if(onClickArrowClose){
            arrowCloseEle.style.cursor = 'pointer';
            arrowCloseEle.addEventListener('click',onClickArrowClose);
        }
        header.appendChild(arrowCloseEle);

        header.classList.add(this.cleanClass('menu-plus-header'));
        return header;
    }

    componentFlexGrow(grow = 1){
        const flex = document.createElement('div');
        flex.style.flexGrow = grow;
        return flex;
    }



    // start line  manual toggle sidebar
    toggleSidebar(toggleState = null) {
        /// 
        this.container.classList.remove(this.cleanClass('menu-plus-core-hidden'));
        this.render.classList.remove(this.cleanClass('menu-plus-core-forced-collapsed'));
        this.render.classList.remove(this.cleanClass('menu-plus-core-collapsed'));

        document.body.style.setProperty('padding-left','60px','important');
        // console.log('toggleState:',toggleState);
        switch (toggleState) {
            case 'open':
            case 'expanded':
                this.render.classList.add(this.cleanClass('menu-plus-core-collapsed'));
                toggleState = 'open';
                break;
            case 'hidden':
                this.container.classList.add(this.cleanClass('menu-plus-core-hidden'));
                this.render.classList.add(this.cleanClass('menu-plus-core-forced-collapsed'));
                document.body.style.setProperty('padding-left','0px','important');
                toggleState = 'hidden';
                break;
            case 'default-state':
                this.render.classList.add(this.cleanClass('menu-plus-core-collapsed'));
                toggleState = this.render.classList.contains(this.cleanClass('menu-plus-core-collapsed')) ? 'open' : 'hidden';
                break;
            case 'toggle':
            default:
                this.render.classList.toggle(this.cleanClass('menu-plus-core-collapsed'));
        }
        document.dispatchEvent(new CustomEvent('MenuKorePlus:sidebar', { detail: { sidebar:toggleState } }));
        // 
    }
    // end line manual toggle sidebar


    // clean up before inserting the class
    cleanClass(className) {
        if(className === undefined) throw new Error('className is required');
        // check if className is a array
        if (Array.isArray(className)) {
            let tmpArr = [];
            for (let i = 0; i < className.length; i++) {
                tmpArr.push(this.cleanClass(className[i]));
            }
            return tmpArr;
        }
        let tmpCN = className.replace(/^[_\.]+|[_\.]+$/g, '');
        return `__${tmpCN}__`;
    }



}

let platformsList = [{
	title: 'Mydev.com',
	img: logoMyDev,
	shortDesc: 'Software Development',
    link: 'https://mydev.com/'
},{
	title: 'iReview.com',
	img: platformsIrevuIcon,
	shortDesc: 'Reputation Management',
    link: 'https://ireview.com/'
},{
	title: 'Claritask.com',
	img: platformsClaritaskIcon,
	shortDesc: 'Project Management',
    link: 'https://claritask.com/'
},{
	title: 'Sendbat.com',
	img: platformsSendBatIcon,
	shortDesc: 'AI Marketing | SMS Email',
    link: 'https://sendbat.com/'
},{
	title: 'iPaymer.com',
	img: platformsIpaymerIcon,
	shortDesc: 'Payment Subscriptions',
    link: 'https://ipaymer.com/'
},{
	title: 'Convosio.com',
	img: platformsConvosioIcon,
	shortDesc: 'Chat Support',
    link: 'https://convosio.com/'
},{
	title: 'Claritick.com',
	img: platformsClaritickIcon,
	shortDesc: 'Ticket Management',
    link: 'https://claritick.com/'
},{
	title: 'Urless.com',
	img: platformsUrlessIcon,
	shortDesc: 'URL | QR | Business Card',
    link: 'https://urless.com/'
},{
	title: 'Zuitte.com',
	img: platformsZuitteIcon,
	shortDesc: 'Business Tools',
    link: 'https://zuitte.com/'
},{
	title: 'Morsix.com',
	img: platformsMorsixIcon,
	shortDesc: 'Warehouse Management',
    link: 'https://morsix.com/'
}];

let servicesList = [{
	title: 'Designed.co',
	img: serviceDesignedCo,
	shortDesc: 'Custom Design',
    link: 'https://designed.co/'
},{
	title: 'Mydev.com',
	img: logoMyDev,
	shortDesc: 'Software Development',
    link: 'https://mydev.com/'
}];

window.MKPlus = new MenuKorePlus(platformsList,servicesList);