/**
 * ENGLISH TRANSLATIONS
 * ====================
 * All English text strings for the GoFresh Market app.
 */

export const en = {
  // Common
  common: {
    search: 'Search',
    searchPlaceholder: 'Search GoFresh Market',
    viewAll: 'View all',
    addToCart: 'Add to cart',
    buyNow: 'Buy now',
    cancel: 'Cancel',
    confirm: 'Confirm',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    continue: 'Continue',
    submit: 'Submit',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    required: 'Required',
    optional: 'Optional',
    free: 'FREE',
    sold: 'Sold',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
    quantity: 'Quantity',
    total: 'Total',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    discount: 'Discount',
    price: 'Price',
    reviews: 'reviews',
    rating: 'Rating',
  },

  // Navigation
  nav: {
    home: 'Home',
    categories: 'Categories',
    flashDeals: 'Flash deals',
    trending: 'Trending',
    contact: 'Contact',
    cart: 'Cart',
    account: 'Account',
    signIn: 'Sign in',
    signOut: 'Sign out',
    track: 'Track',
    trackOrder: 'Track order',
    storeLocator: 'Store finder',
    help: 'Help',
    wishlist: 'Wishlist',
  },

  // Header
  header: {
    searchGroceries: 'Search fresh groceries...',
    freeDelivery: 'Free delivery over ₩30,000',
    tasteOfHome: 'Taste of Home in Korea',
    countries: 'Nepal 🇳🇵 India 🇮🇳 Pakistan 🇵🇰 & More',
  },

  // Categories
  categories: {
    homeProducts: 'Home Products',
    rocketDelivery: 'Rocket Delivery',
    spices: 'Spices',
    riceGrains: 'Rice & Grains',
    flashSales: 'Flash Sales',
    nepal: 'Nepal',
    india: 'India',
    pakistan: 'Pakistan',
    instantFood: 'Instant Food',
    snacks: 'Snacks',
    newIn: 'New In',
    grocery: 'Grocery',
    fashion: 'Fashion',
    sale: 'Sale',
    korea: 'Korea',
  },

  // Home Page
  home: {
    heroTitle: 'Your Home,',
    heroHighlight: 'Delivered in Korea',
    heroSubtitle: 'International Foods & More',
    heroDescription: 'Authentic products from Nepal, India, Pakistan & more. Free delivery on orders over ₩30,000.',
    shopNow: 'Shop now',
    shopByCategory: 'Shop by category',
    trendingNow: 'Trending now',
    flashDeals: 'Flash deals',
    endsIn: 'Ends in',
    shopByOrigin: 'Shop by origin',
    viewAllProducts: 'View all products',
    almostSoldOut: 'Almost sold out!',
    claimed: 'claimed',
    freeDeliveryOver: 'Free Delivery Over ₩30,000',
    internationalCards: 'International Cards Accepted',
    worldwideShipping: 'Worldwide Shipping',
  },

  // Product
  product: {
    addToCart: 'Add to cart',
    buyNow: 'Buy now',
    description: 'Description',
    specifications: 'Specifications',
    reviews: 'Reviews',
    similarProducts: 'Similar products',
    writeReview: 'Write a review',
    verifiedPurchase: 'Verified Purchase',
    helpful: 'Helpful',
    rocketDelivery: 'Rocket delivery',
    arriveBy: 'Arrives by',
    freeShipping: 'Free shipping',
    origin: 'Origin',
    weight: 'Weight',
    bestSeller: 'Best Seller',
    new: 'New',
    trending: 'Trending',
    popular: 'Popular',
    topRated: 'Top Rated',
  },

  // Cart
  cart: {
    title: 'Your cart',
    empty: 'Your cart is empty',
    emptyDescription: 'Add some delicious items to get started!',
    startShopping: 'Start shopping',
    itemCount: '{count} items',
    remove: 'Remove',
    checkout: 'Checkout',
    continueShopping: 'Continue shopping',
    orderSummary: 'Order summary',
    rocketItems: 'Rocket items arrive by 7AM tomorrow!',
    freeShippingMessage: 'Free shipping on orders over ₩30,000',
    addMoreForFreeShipping: 'Add ₩{amount} more for free shipping',
  },

  // Checkout
  checkout: {
    title: 'Checkout',
    step: 'Step {current}/{total}',
    shipping: 'Shipping',
    payment: 'Payment',
    review: 'Review',
    shippingAddress: 'Shipping address',
    paymentMethod: 'Payment method',
    orderSummary: 'Order summary',
    placeOrder: 'Place order',
    fullName: 'Full Name',
    phone: 'Phone',
    postalCode: 'Postal Code',
    address: 'Address',
    addressDetail: 'Address Detail',
    city: 'City',
    yourName: 'Your name',
    streetAddress: 'Street address',
    aptSuite: 'Apt, Suite, Building',

    // Payment Methods
    creditDebitCard: 'Credit/Debit Card',
    kakaoPay: 'Kakao Pay',
    naverPay: 'Naver Pay',
    paypal: 'PayPal',
    bankTransfer: 'Bank Transfer',
    bankTransferReceipt: 'Bank Transfer (Upload Receipt)',

    // Card Details
    cardNumber: 'Card Number',
    expiry: 'Expiry',
    cvv: 'CVV',
    nameOnCard: 'Name on Card',

    // Bank Transfer
    uploadReceipt: 'Upload Receipt',
    receiptUploaded: 'Receipt uploaded',
    receiptInstructions: 'Please transfer to the following account and upload your receipt:',
    bankName: 'Bank Name',
    accountNumber: 'Account Number',
    accountHolder: 'Account Holder',
    uploadReceiptButton: 'Upload receipt image',
    changeReceipt: 'Change receipt',
    receiptNote: 'Your order will be processed after receipt verification (usually within 1-2 hours)',

    // Review
    shippingTo: 'Shipping to',
    items: 'items',
    totalPaid: 'Total paid',

    // Errors
    fillRequired: 'Please fill in all required fields',
    selectPayment: 'Please select a payment method',
    fillCardDetails: 'Please fill in all card details',
    uploadReceiptRequired: 'Please upload your bank transfer receipt',
    paymentFailed: 'Payment failed. Please try again.',

    // Rocket
    rocketDeliveryMessage: 'Your order will arrive by 7AM tomorrow!',
  },

  // Auth
  auth: {
    signInSignUp: 'Sign In / Sign Up',
    verifyOTP: 'Verify OTP',
    completeProfile: 'Complete Profile',
    enterMobile: 'Enter your mobile number',
    sendOTPDescription: "We'll send you a verification code",
    sendOTP: 'Send OTP',
    country: 'Country',
    phoneNumber: 'Phone Number',
    enterVerificationCode: 'Enter verification code',
    sentCodeTo: 'We sent a 6-digit code to',
    verifyOTPButton: 'Verify OTP',
    resendIn: 'Resend code in',
    resendOTP: 'Resend OTP',
    changePhoneNumber: 'Change phone number',
    demoHint: 'Demo: Enter any 6 digits to continue',
    almostDone: 'Almost done!',
    completeDetails: 'Just a few more details to complete your account',
    yourName: 'Your Name',
    enterFullName: 'Enter your full name',
    verifiedPhone: 'Verified Phone',
    completeSignup: 'Complete signup',
    termsAgreement: 'By continuing, you agree to our Terms of Service and Privacy Policy',
    validPhoneError: 'Please enter a valid phone number',
    completeOTPError: 'Please enter the complete 6-digit OTP',
    enterNameError: 'Please enter your name',
    sendOTPFailed: 'Failed to send OTP. Please try again.',
    verifyFailed: 'Verification failed. Please try again.',
  },

  // Order Tracking
  tracking: {
    title: 'Track your order',
    description: 'Enter your order ID or tracking number to check your order status.',
    orderIdOrTracking: 'Order ID or Tracking Number',
    placeholder: 'e.g., GM-XXXXX or TRKXXXXXXXXXX',
    trackOrder: 'Track order',
    whereToFind: 'Where to find your order ID?',
    findTip1: 'Check your order confirmation email',
    findTip2: 'Go to "My Orders" in your account',
    findTip3: 'It starts with "GM-" (e.g., GM-ABC123)',
    notFound: 'Order not found. Please check your order ID or tracking number.',
    orderId: 'Order ID',
    status: 'Status',
    trackingNumber: 'Tracking number',
    trackingProgress: 'Tracking progress',
    orderItems: 'Order items',
    shippingAddress: 'Shipping address',
    trackAnother: 'Track another order',
    expectedBy: 'Expected by',

    // Status
    pending: 'Pending',
    confirmed: 'Confirmed',
    processing: 'Processing',
    shipped: 'Shipped',
    outForDelivery: 'Out for Delivery',
    delivered: 'Delivered',
    cancelled: 'Cancelled',

    // Status Labels
    orderConfirmed: 'Order confirmed',
    orderProcessing: 'Processing',
    orderShipped: 'Shipped',
    orderOutForDelivery: 'Out for delivery',
    orderDelivered: 'Delivered',
  },

  // Order Success
  orderSuccess: {
    title: 'Order placed!',
    thankYou: 'Thank you for your order!',
    confirmationMessage: 'Your order has been confirmed and is being prepared.',
    orderNumber: 'Order number',
    trackingNumber: 'Tracking number',
    total: 'Total',
    rocketDelivery: 'Rocket delivery',
    expectedBy: 'Expected by',
    trackOrder: 'Track order',
    continueShopping: 'Continue shopping',
  },

  // Footer
  footer: {
    tagline: 'Fresh groceries from around the world, delivered to your door in Korea.',
    shop: 'Shop',
    help: 'Help',
    about: 'About',
    shippingInfo: 'Shipping Info',
    returns: 'Returns',
    contactUs: 'Contact Us',
    faq: 'FAQ',
    aboutUs: 'About Us',
    forExpats: 'For Expats',
    careers: 'Careers',
    blog: 'Blog',
    allRightsReserved: 'All rights reserved.',
    weAccept: 'We accept:',
  },

  // Languages
  languages: {
    en: 'English',
    ko: '한국어',
  },
};

export default en;
