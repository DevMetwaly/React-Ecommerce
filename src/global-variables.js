import Cookies from 'universal-cookie';
import { Inbox, Language, QuestionAnswer, Book, Call, Shop } from '@material-ui/icons';
import React from 'react';
import CartIcon from './modules/components/parts/CartIcon';

const cookies = new Cookies();
const LANGUGAE = 'langlang'

if (cookies.get(LANGUGAE) === undefined) cookies.set(LANGUGAE, 'ar');
if (cookies.get(LANGUGAE) !== 'ar' && cookies.get(LANGUGAE) !== 'en') cookies.set(LANGUGAE, 'ar');

const globalVariables = {
    LANG: cookies.get(LANGUGAE),

    // VARIABLES
    ACCESS_TOKEN: 'access_token',
    LANGUGAE: LANGUGAE,
    AFFILIATE_PARAM: 'ref',
    AFFILIATE_COOKIE: 'ref',
    AVATAR_COLOR_COOKIE: 'avatar_color',
    SERVER_BASE_URL: "http://13.92.128.17/",
    PRODUCT_STATUS_STATES: {
        en: ['Pending', 'Preparing', 'Shipping', 'Delivery'],
        ar: ['المراجعة', 'التجهيز', 'الشحن', 'التسليم'],
    },
    GET_PRODUCT_STATUS: (status) => {

        const STATES = [
            { en: 'Pending', ar: 'قيد الإنتظار' },
            { en: 'Active', ar: 'يتم تجهيزه' },
            { en: 'Shipped', ar: 'تم الشحن' },
            { en: 'Delivered', ar: 'تم الإستلام' },
            { en: 'Cancelled', ar: 'تم إلغاؤه' },
            { en: 'Returned', ar: 'تم الإسترجاع' },
        ]

        // status_states as registered in databaste and returned from server.
        let status_states = ['pending', 'active', 'shipped', 'delivered', 'canceled', 'returned'];
        let index = status_states.findIndex(s => s === status);
        return index > -1 ? [STATES[index], index] : [{ en: '-', ar: '-' }, index];
    },
    IMG_SOON: '\\storage\\soon.jpg',


    // MESSAGES
    MSG_LOGIN_FAIL: {
        en: 'Login failed.',
        ar: 'فشل في تسجيل الدخول',
    },
    MSG_LOGIN_SUCCESS: {
        en: 'Logged in successfully.',
        ar: 'تم تسجيل الدخول',
    },

    MSG_LOGOUT_FAIL: {
        en: 'Error.',
        ar: 'فشل!',
    },
    MSG_LOGOUT_SUCCESS: {
        en: 'Logged out successfully.',
        ar: '.تم تسجيل الخروج',
    },

    MSG_REGISTER_SUCCESS: {
        en: 'Registered successfully.\nCheck your mail for account activation.',
        ar: '.تم انشاء حساب بنجاح, تفقد بريدك الالكتروني لتفعيله',
    },
    MSG_REGISTER_FAIL: {
        en: 'Registeration failed.',
        ar: 'فشل تسجيل الحساب.',
    },
    MSG_NETWORK_ERROR: {
        en: 'No response from server.\ntry again later',
        ar: 'لا يوجد استجابة من السيرفر\nحاول مجددا في وقت لاحق'
    },
    MSG_VERIFIY_ACCOUNT: {
        en: 'Please verifiy your account, check your mail!',
        ar: 'رجاء قم بتفعيل حسابك, قم بتفقد بريدك الالكتروني!'
    },
    // TABLE
    TABLE_NO_RECORDS: {
        en: 'No Records to Display',
        ar: 'لا يوجد عناصر لعرضها'
    },
    //Appbar
    APPBAR_SHOP: {
        en: 'Shop',
        ar: 'تسوق'
    },
    APPBAR_SEARCH: {
        en: 'Search ..',
        ar: 'ابحث ..'
    },
    SETTINGS_SECTION_LOGIN: {
        en: 'Sign in | Sign up',
        ar: 'تجسيل الدخول | اشتراك'
    },
    SETTINGS_SECTION_PROFILE: {
        en: 'My Profile',
        ar: 'الملف الشخصي'
    },
    SETTINGS_SECTION_ORDERS: {
        en: 'My Orders',
        ar: 'مشترياتي'
    },
    SETTINGS_SECTION_DASHBOARD: {
        en: 'Dashboard',
        ar: 'لوحة التحكم'
    },
    SETTINGS_SECTION_LINK_GENERATOR: {
        en: 'Link Generator',
        ar: 'مولد اللنكات'
    },
    SETTINGS_SECTION_TEAM_TREE: {
        en: 'Team Tree',
        ar: 'شجرة الفريق'
    },
    SETTINGS_SECTION_AFFILIATE_ORDER:{
        en: 'Affiliate Orders',
        ar: 'الطلبات عن طريق المسوق'
    },
    SETTINGS_SECTION_SIGN_OUT: {
        en: 'Sign Out',
        ar: 'تسجيل الخروج'
    },
    SETTINGS_SECTION_AFFILIATE: {
        en: 'Affiliate Program',
        ar: 'برنامج التسويق',
    },
    SETTINGS_SECTION_SELLER: {
        en: 'Seller Program',
        ar: 'برنامج التجار',
    },
    SETTINGS_SECTION_MY_PRODUCTS: {
        en: 'My Products',
        ar: 'منتجاتي',
    },
    SETTINGS_SECTION_SELLING_ORDERS: {
        en: 'Selling Orders',
        ar: 'اوردرات البيع',
    },
    SETTINGS_SECTION_SELLING_DASHBOARD: {
        en: 'Dashboard',
        ar: 'لوحة التحكم',
    },
    SETTINGS_SECTION_ADD_PRODUCTS: {
        en: 'Add Products',
        ar: 'اضافة منتجات',
    },
    // Searchbar
    SEARCHBAR_SEE_ALL: {
        en: 'SEE ALL RESULTS',
        ar: 'جميع النتائج'
    },
    SEARCHBAR_SECTION_TITLE: {
        en: 'Products',
        ar: 'المنتجات'
    },
    //Afiliate
    AFFILIATE_PAGE1: {
        en: 'Your registration request has been submitted successfully and will be reviewed soon.',
        ar: 'قد تم استلام طلبك بنجاح وسيتم مراجعته قريبا.',
    },
    AFFILIATE_PAGE2: {
        en: 'Your are already in affiliate program.',
        ar: 'انت مسجل في البرنامج بالفعل.',
    },
    AFFILIATE_REFUSED: {
        en: 'Your request have been refused, contact with support or send new application',
        ar: 'لقد تم رفض طلبك, تواصل مع الدعم او قم بارسال طلب جديد',

    },
    AFFILIATE_BLOCKED: {
        en: 'You have been blocked for a while, contact support if you think that shouldn\'t happen',
        ar: 'لقد تم ايقاف حسابك, تواصل مع الدعم',

    },
    FORM_AFFILIATE_LABEL_VODAFONE: {
        en: 'Vodafone Cash',
        ar: 'فودافون كاش',
    },
    FORM_AFFILIATE_LABEL_ETISALAT: {
        en: 'Etisalat Cash',
        ar: 'اتصالات كاش',
    },
    FORM_AFFILIATE_LABEL_Bank: {
        en: 'Bank',
        ar: 'حساب بنكي',
    },
    FORM_AFFILIATE_LABEL_PACKAGE: {
        en: 'Package',
        ar: 'الحزمة',
    },
    FORM_AFFILIATE_LABEL_PAYMENT_METHOD: {
        en: 'Payment Method',
        ar: 'طريقة الدفع',
    },
    Package1_AFFILIATE: {
        en: ['Discount 25%'],
        ar: ['خصم 25%']
    },
    Package2_AFFILIATE: {
        en: ['Discount 20%'],
        ar: ['خصم 20%']
    },
    Package3_AFFILIATE: {
        en: ['Discount 10%'],
        ar: ['خصم 10%']
    },


    //Seller
    SELLER_PAGE1: {
        en: 'Your registration request has been submitted successfully and will be reviewed soon.',
        ar: 'قد تم استلام طلبك بنجاح وسيتم مراجعته قريبا.',
    },
    SELLER_PAGE2: {
        en: 'Your are already in seller program.',
        ar: 'انت مسجل في البرنامج بالفعل.',
    },
    SELLER_ADD_NEW_ACCOUNT:{
        en: 'add new account',
        ar: 'اضف حساب جديد'
    },
    SELLER_PAYMENT_REQUEST:{
        en: 'Request',
        ar: 'طلب دفع'
    },
    FORM_SELLER_LABEL_VODAFONE: {
        en: 'Vodafone Cash',
        ar: 'فودافون كاش',
    },
    FORM_SELLER_LABEL_ETISALAT: {
        en: 'Etisalat Cash',
        ar: 'اتصالات كاش',
    },
    FORM_SELLER_LABEL_ITEMS: {
        en: 'Item\'s Type',
        ar: 'انواع المنتجات',
    },
    FORM_SELLER_LABEL_NAME: {
        en: 'Store Name(Arabic)',
        ar: 'اسم المتجر(عربي)',
    },
    FORM_SELLER_LABEL_NAME_EN: {
        en: 'Store Name(English)',
        ar: 'اسم المتجر(انجليزي)',
    },
    FORM_SELLER_LABEL_STORE_URL: {
        en: 'Store URL',
        ar: 'URL المتجر',
    },
    FORM_SELLER_LABEL_STORE_ADDRESS: {
        en: 'Store Address',
        ar: 'عنوان المخزن',
    },
    FORM_SELLER_LABEL_STORE_SLUG: {
        en: 'SLUG',
        ar: 'سلاج',
    },
    FORM_SELLER_LABEL_STORE_EMAIL: {
        en: 'Email',
        ar: 'البريد الالكتروني',
    },
    // FORM_SELLER_LABEL_PICKUP_ADDRESS:{
    //         en:'Pickup Address',
    //         ar:'موقع الشحن',
    //     },
    FORM_SELLER_LABEL_PICKUP_PHONE: {
        en: 'Phone Number',
        ar: 'رقم الهاتف',
    },

    // Seller Dashboard
    DASHBOARD_PENDING_EARN: {
        en: 'Pending Earn',
        ar: 'الارباح المعلقة'
    },
    DASHBOARD_PENDING_EARN_DESC: {
        en: 'Earning from proudct not deliverd yet',
        ar: 'الارباح من المنتجات التي لم تصل للعميل'
    },
    DASHBOARD_APPROVED_EARN: {
        en: 'Approved Earn',
        ar: 'الارباح الحالي'
    },
    DASHBOARD_APPROVED_EARN_DESC: {
        en: 'Earning from products deliverd but still in returnable days',
        ar: 'الارباح من المنتجات التي تم ايصالها ولكنها قابلة للارجاع'
    },
    DASHBOARD_CONFIRMED_EARN: {
        en: 'Confirmed Earn',
        ar: 'الارباح'
    },
    DASHBOARD_CONFIRMED_EARN_DESC: {
        en: 'Earning can be withraw',
        ar: 'الارباح  يمكن سحبها'
    },

    // User Dashboard
    DASHBOARD_CLICKS: {
        en: 'Clikcs',
        ar: 'الكليكات',
    },
    DASHBOARD_CLICKS_DESC: {
        en: 'Cliks on affiliate link',
        ar: 'الضغطات على رابط الافيليت',
    },
    DASHBOARD_TOTAL_ORDERS: {
        en: 'Total Orders',
        ar: 'اجمالي الطلبات',
    },
    DASHBOARD_TOTAL_ORDERS_DESC: {
        en: 'My orders and affiliate link orders',
        ar: 'طلباتي والطلبات عن طريق رابط الافيليت',
    },
    DASHBOARD_CONFIRMED_ORDERS: {
        en: 'Confirmed Orders',
        ar: 'الطلبات المكتملة',
    },
    DASHBOARD_CONFIRMED_ORDERS_DESC: {
        en: 'Delivered orderrs',
        ar: 'الطلبات التي وصلت للعميل',
    },
    DASHBOARD_ORDERS_EARNING: {
        en: 'Orders Earning',
        ar: 'ارباح الطلبات',
    },
    DASHBOARD_ORDERS_EARNING_DESC: {
        en: 'Earnings form delivered orders',
        ar: 'ارباح الطلبات المكتملة',
    },
    DASHBOARD_TEAM_MEMBERS: {
        en: 'My Team',
        ar: 'فريقي',
    },
    DASHBOARD_TEAM_MEMBERS_DESC: {
        en: '',
        ar: '',
    },
    DASHBOARD_TEAM_EARNING: {
        en: 'Team Earning',
        ar: 'ارباح الفريق',
    },
    DASHBOARD_TEAM_EARNING_DESC: {
        en: '',
        ar: '',
    },
    DASHBOARD_REFERRAL_EARNING: {
        en: 'Refferal Earning',
        ar: 'حوافز اضافية',
    },
    DASHBOARD_REFERRAL_EARNING_DESC: {
        en: '',
        ar: '',
    },
    DASHBOARD_CONFIRMED_EARNING: {
        en: 'My Balance',
        ar: 'رصيدي',
    },
    DASHBOARD_CONFIRMED_EARNING_DESC: {
        en: '',
        ar: '',
    },
    DASHBOARD_MY_LEVEL : {
        en: 'My Level',
        ar: 'المستوى'
    },
    DASHBOARD_MY_LEVEL_DESC: {
        en: '',
        ar: ''
    },

    //User Profile

    PROFILE_TITLE: {
        en: 'Profile',
        ar: 'الملف الشخصي'
    },
    PROFILE_MAIN_SETTINGS: {
        en: 'Main Settings',
        ar: 'الاعدادات الرئيسية'
    },
    PROFILE_SECURITY_SETTINGS: {
        en: 'Security Settings',
        ar: 'معلومات الامان'
    },
    PROFILE_EDIT_SUCCESS_MESSAGE: {
        en: 'Changes saved successfully',
        ar: 'تمت العملية بنجاح'
    },
    PROFILE_EDIT_ERROR_MESSAGE: {
        en: 'Error occured',
        ar: 'حدث خطا ما'
    },


    //Upperbar
    UPPERBAR_LANGUAGE: {
        en: 'العربية',
        ar: 'English'
    },
    UPPERBAR_US: {
        en: 'Who is us?',
        ar: 'من نحن؟'
    },
    UPPERBAR_Q: {
        en: 'Questions',
        ar: 'اسئلة'
    },
    UPPERBAR_MAGAZINE: {
        en: 'Magazine',
        ar: 'المجلة'
    },
    UPPERBAR_CALL_US: {
        en: 'Call us',
        ar: 'اتصل بنا'
    },
    // POPUP TYPES
    TYPE_SUCCESS: 'success',
    TYPE_ERROR: 'error',
    TYPE_INFO: 'info',

    // Cart
    CART_TITLE: {
        en: 'Shopping Cart',
        ar: 'عربة التسوق'
    },
    CART_ADD: {
        en: 'Add To Cart',
        ar: 'اضف الى العربة'
    },
    CART_ORDER_SUMMARY: {
        en: 'Order Summary',
        ar: 'ملخص الطلبية'
    },
    CART_ORDER_ITEMS_PRICE: {
        en: 'Items Price',
        ar: 'مجموع المنتجات'
    },
    CART_ORDER_SHIPPING_PRICE: {
        en: 'Shipping',
        ar: 'الشحن'
    },
    CART_ORDER_SHIPPING_STATUS: {
        en: 'Please proceed and choose shipping location',
        ar: 'يرجى المتابعة واختيار منطقة الشحن'
    },
    CART_ORDER_TOTAL_PRICE: {
        en: 'Total',
        ar: 'الإجمالي'
    },
    CART_CHECKOUT: {
        en: 'Checkout',
        ar: 'متابعة عملية الشراء'
    },
    CART_EMPTY: {
        en: 'Shopping cart is empty',
        ar: 'لا يوجد منتجات في عربة التسوق',
    },
    CART_VISIT_STORE: {
        en: 'Please visit our shop and add some items from',
        ar: 'يمكنك زيارة متجرنا واضافة بعض المنتجات من'
    },

    // Product
    PRODUCT_SHIPPING_STATUS: {
        en: 'Shipping is not supported for this area',
        ar: 'هذه المنطقة غير مدعومة في الشحن'
    },
    PRODUCT_WEIGHT_CHARGE: {
        en: 'each each kilo more than',
        ar: 'كل كيلو زيادة عن'
    },
    PRODUCT_NOT_FOUND: {
        en: 'Product Not Found',
        ar: 'لم يتم العثور على المنتج'
    },
    PRODUCT_NOT_FOUND_MESSAGE: {
        en: '',
        ar: ''
    },
    PRODUCT_OUT_OF_STOCK: {
        en: 'Out of stock',
        ar: 'غير متوفر حاليا'
    },
    PRODUCT_ADD_NEW_SPEC: {
        en: 'Add New Spec Value',
        ar: 'اضافة قيمة مواصفات جديدة'
    },
    PRODUCT_MAIN_INFO: {
        en: 'MAIN INFORMATION',
        ar: 'العلومات الرئيسية'
    },
    PRODUCT_IMAGES: {
        en: 'IMAGES CONTROL',
        ar: 'التحكم في الصور'
    },
    PRODUCT_CATEGORIES: {
        en: 'Category and Specs',
        ar: 'الفئة والمواصفات'
    },
    PRODUCT_DESCRIPTION: {
        en: 'General Description',
        ar: 'الوصف العام'
    },
    PRODUCT_NAME_DESC:{
        en: 'Will be used as a slug of the product in url. try to make the name expressive about the product',
        ar: 'سيتم استخدام الاسم كسلاج للمنتج في اللنك. حاول ان تجعل اسم المنتج معبرا عنه'
    },
    PRODUCT_COMMISSION_DESC: {
        en: 'Value of commission the affiliate will receive. increasing this value will increase the probability of product marketing',
        ar: 'قيمة العمولة التي سيحصل عليها المسوق. عند زيادة قيمة هذه العمولة فانه من المرجح ان يتم تسويق المنتج بشكل اكبر'
    },
    PRODUCT_SKU_DESC: {
        en: 'Same SKU is used for similar products that has differ in color, ram for example. use same SKU if you want to navigate to similars in product privew page.',
        ar: 'يتم استخدام نفس الـ SKU للمنتجات التي ستيم دمجها كمنتج واحد في صفحة عرض المنتج وهذا يوفر ايضا الوصول لنفس المنتج بخصائصه المختلفة. حيث ان هذه المنتجات تختلف فقط في بعض الخصائص مثل اللون او ذاكرة التخزين على سبيل المثال.'
    },
    PRODUCT_TEBX_DESC: {
        en: 'Check this if your product is verified by TEBX.',
        ar: 'قم بالتأكيد اذا كان منتجك موثق لدى TEBX'
    },
    PRODUCT_WEIGHT_DESC: {
        en: 'use 0 weigth to avoid extra charge (client) on product shipment f',
        ar: 'يمكن وضع وزن المنتج ب0 لكي لا يتم احتساب قيمة إضافية (للعميل) على شحن المنتج'
    },
    


    // Checkout
    CHECKOUT_SHIPPING_ADDRESS: {
        en: 'Shipping address',
        ar: 'عنوان الشحن'
    },
    CHECKOUT_THANKS_STATUS: {
        en: 'Order has been placed successfully!',
        ar: 'لقد تمت عملية الشراء بنجاح!'
    },
    CHECKOUT_THANKS_REDIRECT: {
        en: 'Thank you!, you can check your order status from',
        ar: 'شكرا لثقتك بنا, يمكنك متابعة حالة طلبك من'
    },

    CHECKOUT_ADD_NEW_ADDRESS: {
        en: 'Add new address',
        ar: 'اضف عنوان جديد'
    },

    
    //Labels
    LABEL_EMPTY_FIELDS: {
        en: 'There is an empty fields',
        ar: 'قم بملئ جميع الحقول'
    },
    LABEL_HOME_BRANDS_SLIDER: {
        en: 'Featured Brands',
        ar: 'ماركات مميزة',
    },
    LABEL_HOME_PRODUCTS_SLIDER: {
        en: 'Featured Products',
        ar: 'منتجات مميزة',
    },
    LABEL_HOME_INFO: {
        en: 'Our Vision',
        ar: 'رؤيتنا',
    },
    LABEL_SAVE_CHANGES: {
        en: 'Save Changes',
        ar: 'حفظ التغييرات'
    },
    LABEL_NO_PRODUCTS: {
        en: 'No products.',
        ar: 'لا يوجد منتجات.'
    },
    LABEL_SHOP_BANNER: {
        en: 'Shop Now!',
        ar: 'تسوق الان!',
    },
    LABEL_SHOP_SORT: {
        en: 'SORT BY',
        ar: 'الترتيب',
    },
    LABEL_SHOP_PERPAGE: {
        en: 'PER PAGE',
        ar: 'لكل صفحة',
    },
    LABEL_SHOP_TO: {
        en: 'TO',
        ar: 'الى',
    },
    LABEL_SHOP_APPLY: {
        en: 'APPLY',
        ar: 'تطبيق',
    },
    LABEL_SHOP_ADD_TO_CART: {
        en: 'ADD TO CART',
        ar: 'اضف للسلة',
    },
    LABEL_SHOP_VIEW_DETAILS: {
        en: 'VIEW DETAILS',
        ar: 'التفاصيل',
    },
    LABEL_PRODUCT_CODE: {
        en: 'Code',
        ar: 'كــود',
    },
    LABEL_PRODUCT_ORDER: {
        en: 'Place Order',
        ar: 'اطلب المنتج',
    },
    LABEL_PRODUCT_BEFORE_DISCOUNT: {
        en: 'Before Discount',
        ar: 'قبل الخصم',
    },
    LABEL_PRODUCT_PRICE2: {
        en: 'Price',
        ar: 'السعــر',
    },
    LABEL_PRODUCT_SAVING: {
        en: 'You Save',
        ar: 'ستوفـر',
    },
    LABEL_PRODUCT_COMMISSION: {
        en: 'Commission',
        ar: 'العمولة',
    },
    LABEL_PRODUCT_TEBX: {
        en: 'VERIFIED BY',
        ar: 'موثق من',
    },
    LABEL_WEIGHT_MEASURE: {
        en: 'kilo',
        ar: 'كيلو'
    },
    LABEL_PRODUCT_SPECS: {
        en: 'Specifications',
        ar: 'المواصفات',
    },
    LABEL_PRODUCT_ADD_PRODUCT: {
        en: 'Add It',
        ar: 'لطلب المنتج',
    },
    LABEL_PRODUCT_DELIVERED_BY: {
        en: 'Delivered in:',
        ar: 'يصل في:',
    },
    LABEL_PRODUCT_DAYS: {
        en: 'days',
        ar: 'ايام',
    },
    LABEL_PAYMENT: {
        en: 'Payment',
        ar: 'الدفع'
    },
    LABEL_THANKS: {
        en: 'Thanks',
        ar: 'شكرا'
    },
    LABEL_HERE: {
        en: 'Here',
        ar: 'هنا'
    },
    LABEL_SHIPPING_TO: {
        en: 'Shipping to',
        ar: 'الشحن الى'
    },
    LABEL_SHIPPING: {
        en: 'Shipping',
        ar: 'الشحن'
    },
    LABEL_SELLER: {
        en: 'Seller',
        ar: 'البائع'
    },
    LABEL_QUANTITY: {
        en: 'Quantity',
        ar: 'الكمية'
    },
    LABEL_WEIGHT:{
        en: 'Weight',
        ar: 'الوزن'
    },
    LABEL_CURRENCY: {
        en: 'EGP',
        ar: 'جنيه'
    },
    LABEL_COMMISSION: {
        en: 'Commision',
        ar: 'العمولة'
    },
    LABEL_PRICE: {
        en: 'Price',
        ar: 'السعر'
    },
    LABEL_SALE_PRICE: {
        en: 'Sale price',
        ar: 'سعر مخفض'
    },
    LABEL_FREE: {
        en: 'FREE',
        ar: 'مجاني'
    },
    LABEL_DESCRIPTION: {
        en: 'Description',
        ar: 'الوصف'
    },
    LABEL_PRODUCT: {
        en: 'Product',
        ar: 'منتج'
    },
    LABEL_PRODUCT_DISCOUNT: {
        en: 'OFF',
        ar: 'خصم'
    },
    LABEL_PRODUCT_PRICE: {
        en: 'Product Price',
        ar: 'سعر المنتج'
    },
    LABEL_NEXT: {
        en: 'Next',
        ar: 'التالي'
    },
    LABEL_PREVIOUS: {
        en: 'Previous',
        ar: 'السابق'
    },
    LABEL_BUY: {
        en: 'Buy',
        ar: 'شراء'
    },
    LABEL_DETAILS: {
        en: 'Details',
        ar: 'التفاصيل'
    },
    LABEL_NAME: {
        en: 'Name',
        ar: 'الاسم'
    },
    LABEL_PHONE: {
        en: 'Phone',
        ar: 'موبايل'
    },
    LABEL_ADDRESS: {
        en: 'Adress',
        ar: 'العنوان'
    },
    LABEL_BUILD: {
        en: 'Build',
        ar: 'توليد'
    },
    LABEL_URL: {
        en: 'URL',
        ar: 'رابط'
    },
    LABEL_MY_ORDERS: {
        en: 'My Orders',
        ar: 'مشترياتي'
    },
    LABEL_DASHBOARD: {
        en: 'Dashbaord',
        ar: 'الاحصائيات'
    },

    LABEL_AFFILIATE: {
        en: 'Affiliate',
        ar: 'مسوق',
    },
    LABEL_LANGUAGE: {
        en: 'Langugage',
        ar: 'اللغة'
    },
    LABEL_AVATAR: {
        en: 'Avatar',
        ar: 'الافتار'
    },
    LABEL_REGISTERED_AT: {
        en: 'Registerd at',
        ar: 'سجل في'
    },
    LABEL_LEVEL: {
        en: 'Level',
        ar: 'المستوى'
    },
    LABEL_EARNINGS: {
        en: 'Earnings',
        ar: 'الارباح'
    },
    LABEL_OF: {
        en: 'Of',
        ar: 'من'
    },
    LABEL_FIRST_PAGE: {
        en: 'First Page',
        ar: 'الصفحة الاولى'
    },
    LABEL_LAST_PAGE: {
        en: 'Last Page',
        ar: 'الصفحة الاخير'
    },
    LABEL_ROWS: {
        en: 'rows',
        ar: 'صفوف'
    },
    LABEL_RESEND: {
        en: 'Resend',
        ar: 'اعادة ارسال'
    },
    LABEL_OR: {
        en: 'or',
        ar: 'أو'
    },
    LABEL_CATEGORY: {
        en: 'Category',
        ar: 'القسم'
    },
    LABEL_REFRESH: {
        en: 'Refresh',
        ar: 'اعادة التحميل'
    },
    LABEL_EDIT: {
        en: 'Edit',
        ar: 'تعديل'
    },
    LABEL_JOIN_NOW: {
        en: 'Join Now',
        ar: 'انضم الآن'
    },
    LABEL_CHECK_ACCOUNT: {
        en: 'Check Your Account',
        ar: 'تفحص حسابك'
    },
    LABEL_RETURNED: {
        en: 'Return Balance',
        ar: 'رصيد الاسترجاع',
    },


    // Tables
    LABEL_SELLING_ORDERS_PENDING: {
        en: 'Pending Orders',
        ar: 'الاوردرات المعلقة',
    },
    LABEL_SELLING_ORDERS_NOT_PENDING: {
        en: 'Rest Orders',
        ar: 'بقية الاوردرات'
    },
    LABEL_AFFILIATE_ORDERS_TRANSACTIONS: {
        en: 'Completed Orders Commission',
        ar: 'اوردرات مكتملة ونسبة الربح'
    },
    LABEL_SELLING_ORDERS_SHIPPING: {
        en: 'Shipping Orders',
        ar: 'الاودرات في الشحن',
    },
    LABEL_SELLING_ORDERS_DONE: {
        en: 'Finished Orders',
        ar: 'الاودرات المكتملة',
    },

    TABLE_WITHDRAW_TITLE: {
        en: 'Withdraw Requests',
        ar: 'طلبات السحب'
    },

    // Link Genrator Page
    LINK_GENERATOR_TITLE: {
        en: 'Affiliate Link Generator',
        ar: 'مولد لينك الافيليت'
    },
    LINK_GENERATOR_PUT: {
        en: 'Put Page URL Here',
        ar: 'ضع الرابط هنا'
    },
    LINK_GENERATOR_AFFILIATE_LINK: {
        en: 'Affiliate Link',
        ar: 'رابط الافيليت'
    },



    // My Orders 
    MY_ORDERS_EMPTY: {
        en: 'You haven\'t make any order',
        ar: 'لم تقم بشراء اي منتج',
    },
    MY_ORDERS_VISIT_STORE: {
        en: 'Please visit our shop and buy items from',
        ar: 'يمكنك زيارة متجرنا وشراء بعض المنتجات من'
    },


    // LOGIN FORM
    FORM_LOGIN_LABEL_TITLE: {
        en: 'Login',
        ar: 'تسجيل الدخول',
    },
    FORM_LOGIN_LABEL_EMAIL: {
        en: 'Email',
        ar: 'البريد الالكتروني',
    },
    FORM_LOGIN_LABEL_PASS: {
        en: 'Password',
        ar: 'كلمة المرور',
    },
    FORM_LOGIN_LABEL_LOGIN: {
        en: 'Login',
        ar: 'تسجيل الدخول',
    },
    FORM_LOGIN_LABEL_FORGOT: {
        en: 'Forgot your password?',
        ar: 'هل نسيت كلمة المرور؟',
    },
    FORM_LOGIN_LABEL_REMEMBER: {
        en: 'Remember me',
        ar: 'تذكرني',
    },
    FORM_LOGIN_ERR_EMAIL: {
        en: 'Invalid email.',
        ar: 'البريد غير صحيح',
    },
    FORM_LOGIN_ERR_PASS: {
        en: 'Invalid password.',
        ar: 'كلمة المرور غير صحيح',
    },


    // Register
    FORM_REGISTER_LABEL_TITLE: {
        en: 'Create new account',
        ar: 'انشاء حساب جديد'
    },
    FORM_REGISTER_LABEL_EMAIL: {
        en: 'Email',
        ar: 'البريد الالكتروني'
    },
    FORM_REGISTER_LABEL_PASSWORD: {
        en: 'Password',
        ar: 'الرقم السري'
    },
    FORM_REGISTER_LABEL_FIRST_NAME: {
        en: 'First name',
        ar: 'الاسم الاول'
    },
    FORM_REGISTER_LABEL_LAST_NAME: {
        en: 'Last name',
        ar: 'الاسم الاخير'
    },
    FORM_REGISTER_LABEL_PHONE: {
        en: 'Mobile',
        ar: 'رقم الهاتف'
    },
    FORM_REGISTER_LABEL_BIRTHDAY: {
        en: 'Birthday',
        ar: 'عيد الميلاد'
    },
    FORM_REGISTER_LABEL_SEX: {
        en: 'Sex',
        ar: 'الجنس'
    },
    FORM_REGISTER_LABEL_REGISTER: {
        en: 'Register',
        ar: 'تسجيل'
    },

    // Form Address
    FORM_ADDRESS_LABEL_EMAIL: {
        en: 'Email',
        ar: 'البريد الالكتروني'
    },

    FORM_ADDRESS_LABEL_FIRST_NAME: {
        en: 'First name',
        ar: 'الاسم الاول'
    },
    FORM_ADDRESS_LABEL_LAST_NAME: {
        en: 'Last name',
        ar: 'الاسم الاخير'
    },
    FORM_ADDRESS_LABEL_PHONE: {
        en: 'Mobile',
        ar: 'رقم الهاتف'
    },

    FORM_ADDRESS_LABEL_SEX: {
        en: 'Sex',
        ar: 'الجنس'
    },
    FORM_ADDRESS_LABEL_COUNTRY: {
        en: 'Governorate',
        ar: 'المحافظة'
    },
    FORM_ADDRESS_LABEL_CITY: {
        en: 'City',
        ar: 'المدينة'
    },
    FORM_ADDRESS_LABEL_AREA: {
        en: 'Area',
        ar: 'المنطقة'
    },
    FORM_ADDRESS_LABEL_ADDRESS: {
        en: 'Address',
        ar: 'العنوان'
    },
    FORM_ADDRESS_LABEL_LAND_MARK: {
        en: 'Land mark',
        ar: 'علامة مميزة'
    },
    FORM_ADDRESS_LABEL_NOTE: {
        en: 'Note',
        ar: 'ملاحظة'
    },
    FORM_ADDRESS_LABEL_OK: {
        en: 'Done',
        ar: 'موافق'
    },
    FORM_ADDRESS_LABEL_BACK: {
        en: 'Back',
        ar: 'رجوع'
    },

    //Return Form
    FORM_RETURN_LABEL_BUTTON: {
        en: 'Return Product',
        ar: 'ارجاع المنتج',
    },
    FORM_RETURN_LABEL_TITLE: {
        en: 'Product Return Request',
        ar: 'طلب ارجاع منتج',
    },
    FORM_RETURN_LABEL_REASON: {
        en: 'Return reason',
        ar: 'سبب الإرجاع',
    },
    FORM_RETURN_LABEL_NOTE: {
        en: 'Details',
        ar: 'التفاصيل',
    },
    FORM_RETURN_PROCESSING: {
        en: 'Return Requested',
        ar: 'تم تقديم طلب الإسترجاع',
    },

    // Track Order
    TRACK_OREDER_RECIPIENT: {
        en: 'Recipient',
        ar: 'المتسلم'
    },
    TRACK_OREDER_TOTAL_PRICE: {
        en: 'Total Price',
        ar: 'اجمالي السعر'
    },
    TRACK_OREDER_DATE: {
        en: 'Order placed on',
        ar: 'تاريخ الطلب'
    },
    TRACK_OREDER_STATUS: {
        en: 'Order Status',
        ar: 'حالة الطلب'
    },
    TRACK_OREDER_NUMBER: {
        en: 'Order Number',
        ar: 'رقم الطلب'
    },
    TRACK_OREDER_DETAIL: {
        en: 'Order Details',
        ar: 'تفاصيل الطلب'
    },



    PAGE_TITLE_SERVER_ERROR: {
        en: 'Server Unavailable | TEBX',
        ar: 'الخادم غير متوفر | TEBX'
    },
    PAGE_TITLE_CART: {
        en: 'Cart | TEBX',
        ar: 'عربة التسوق | TEBX'
    },
    PAGE_TITLE_CHECKOUT: {
        en: 'Checkout | TEBX',
        ar: 'الدفع | TEBX'
    },
    PAGE_TITLE_HOME: {
        en: 'Home | TEBX',
        ar: 'الصفحة الرئيسية | TEBX'
    },
    PAGE_TITLE_NOT_FOUND: {
        en: 'Page Not Found | TEBX',
        ar: 'الصفحة غير موجودة | TEBX'
    },
    PAGE_TITLE_PRODUCT: {
        en: 'Product | TEBX',
        ar: 'منتج | TEBX'
    },
    PAGE_TITLE_SHOP: {
        en: 'Shop | TEBX',
        ar: 'المتجر | TEBX'
    },
    PAGE_TITLE_TRACK_ORDER: {
        en: 'Track Order | TEBX',
        ar: 'تتبع شحنتك | TEBX'
    },
    PAGE_TITLE_VERIFY: {
        en: 'Verify | TEBX',
        ar: 'تفعيل | TEBX'
    },
    PAGE_TITLE_AUTH: {
        en: 'TEBX',
        ar: 'TEBX'
    },
    PAGE_TITLE_USER_PANEL: {
        en: 'Profile | TEBX',
        ar: 'الصفحة الشخصية | TEBX'
    },

    // Network Error
    NETWORK_ERROR_SERVER: {
        en: 'Server Unavailable',
        ar: 'الخادم غير متاح'
    },
    NETWORK_ERROR_SERVER_MESSAGE: {
        en: 'We are trying to fix that error, you may need to try again later and refresh page',
        ar: 'نحن نعمل على اصلاح المشكلة, اعد المحاولة لاحقا وقم بتحميل الصفحة من جديد'
    },

    HOME_AFFILIATE_TITLE: {
        en: 'Work With Us',
        ar: 'اشتغل معانا',
    },
    HOME_AFFILIATE: [
        {
            title: {
                en: 'Special Commission Program',
                ar: 'برنامج عمولات مميز'
            },
            description: {
                en: '',
                ar: 'مع وجود برنامج مميز للعمولات احصل على عمولات تصل الى 40% على المنتجات التي يتم تسويقها عن طريقك.'
            },
            icon: { set: 'fas', name: 'heart' }
        },
        {
            title: {
                en: 'Build Your Team',
                ar: 'كون فريقك'
                
            },
            description: {
                en: '',
                ar: 'كون فريقك من المسوقين واحصل على عمولات تصل الى 30% من مبيعات فريقك.'
            },
            icon: { 
                set: 'fas', 
                name: 'calendar-check' 
            }
        },
        {
            title: {
                en: 'Training Program',
                ar: 'برنامج التدريب'
               
            },
            description: {
                en: '',
                ar: 'نوفر لك العديد من التدريبات ال Online  وال Offline  على يد خبراء في مجال التسويق بالعمولة والتسويق الالكتروني واللي هتساعدك في زيادة حجم ارباحك الشهرية ل 3 اضعاف على الاقل.'
            },
            icon: { 
                set: 'fas',
                name: 'layer-group' 
            }
        },
        {
            title: {
                en: 'Free Registeration',
                ar: 'سجل مجانا'
            },
            description: {
                en: '',
                ar: 'الاشتراك مجاني وبدون اي رسوم او شروط خاصة فقط عن طريق التسجيل.'
            },
            icon: { 
                set: 'fas',
                name: 'layer-group' 
            }
        },
    ],


    HOME_SELLER_TITLE: {
        en: 'TBEx for Sellers',
        ar: 'TBEx للتجار',
    },
    HOME_SELLER: [
        {
            title: {
                en: '',
                ar: ''
            },
            description: {
                en: '',
                ar: 'ضاعف حجم مبيعاتك واحصل على اكثر من 1000 طلب شهريا بمجرد عرض منتجاتك على الموقع.'
            },
            icon: { set: 'fas', name: 'heart' }
        },
        {
            title: {
                en: '',
                ar: ''
                
            },
            description: {
                en: '',
                ar: 'تسليم فوري لمستحقاتك المالية بمجرد وصول الطلب الى العميل.'
            },
            icon: { 
                set: 'fas', 
                name: 'calendar-check' 
            }
        },
        {
            title: {
                en: '',
                ar: ''
               
            },
            description: {
                en: '',
                ar: 'انشئ صفحة خاصة بعلامتك التجارية على الموقع مجانا وبدون اي رسوم فقط مقابل عمولة يتم تحديدها عن طريك.'
            },
            icon: { 
                set: 'fas',
                name: 'layer-group' 
            }
        },
       
    ],


}

export const noImage = "https://thefittingsource.com/wp-content/uploads/2017/12/temp-inventory-landing.jpg"





// functions

export function getProductURL(product) {
    return `${product.slug}/${product.id}-${product.sku}`
}

export const handleLanguageToggle = () => {
    cookies.set(globalVariables.LANGUGAE,  globalVariables.LANG === 'en' ? 'ar' : 'en');
    window.location.reload();
}

export const upperLinks = [
    {
        title: globalVariables.UPPERBAR_LANGUAGE[globalVariables.LANG],
        onClick: handleLanguageToggle,
        icon: <Language />
    },
    {
        title: globalVariables.UPPERBAR_US[globalVariables.LANG],
        link: '/About',
        icon: <Inbox />
    },
    {
        title: globalVariables.UPPERBAR_Q[globalVariables.LANG],
        link: '/FAQ',
        icon: <QuestionAnswer />
    },
    {
        title: globalVariables.UPPERBAR_MAGAZINE[globalVariables.LANG],
        link: '/Magazine',
        icon: <Book />
    },
    {
        title: globalVariables.UPPERBAR_CALL_US[globalVariables.LANG],
        link: '/Contact-us',
        icon: <Call />
    },
];


export const bottomLinks = [
    {
        title: globalVariables.APPBAR_SHOP[globalVariables.LANG],
        link: '/shop',
        icon: <Shop />
    },
    {
        title: globalVariables.CART_TITLE[globalVariables.LANG],
        link: '/cart',
        icon: <CartIcon iconOnly />
    },
];

export const footerSections = [
    {
        title: { en: 'ABOUT TEBX', ar: 'عن TEBX' },
        links: [
            {
                title: { en: 'Who We Are?', ar: 'من نحن؟' },
                link: '/about'
            },
            {
                title: { en: 'Our Goals', ar: 'اهدافنا' },
                link: '/goals'
            },
            {
                title: { en: 'FAQ', ar: 'اسألة شائعة' },
                link: '/faq'
            },
            {
                title: { en: 'Contact Us', ar: 'تواصل معنا' },
                link: '/contact-us'
            }
        ]
    },
    {
        title: { en: 'WORK WITH US', ar: 'إعمل معنا' },
        links: [
            {
                title: { en: 'Sell Your Products', ar: 'بيع منتجاتك' },
                link: '/seller'
            },
            {
                title: { en: 'Affiliate Program', ar: 'التسويق بالعمولة' },
                link: '/affiliate'
            },
            {
                title: { en: 'Advertising', ar: 'الإعلانات' },
                link: '/advertising'
            },
        ]
    },
    {
        title: { en: 'OUR POLICY', ar: 'سياسات الشركة' },
        links: [
            {
                title: { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
                link: '/privacy-policy'
            },
            {
                title: { en: 'Terms and Conditions', ar: 'الشروط والأحكام' },
                link: '/terms-and-conditions'
            },
            {
                title: { en: 'Return Policy', ar: 'سياسة الإسترجاع' },
                link: '/return-policy'
            },
        ]
    },
]
export const FOLLOW_US = [
    {
        title: '',
        icon: 'twitter',
        link: 'https://twitter.com',
    },
    {
        title: '',
        icon: 'youtube',
        link: 'https://youtube.com',
    },
    {
        title: '',
        icon: 'linkedin',
        link: 'https://linkedin.com',
    },
    {
        title: '',
        icon: 'facebook',
        link: 'https://facebook.com',
    },
]
export const logo = '/logo-ar.png';
export default globalVariables;