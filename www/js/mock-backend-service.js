angular.module('app.services')

.service('mockBackend', [function(){
    var loginUserId = '42';

    var users = {
        '42': {
            userId: '42',
            email: 'johume@email.test',
            userType: 'customer',
            attributes: {
                rating: null,
                name: 'Jo Hume',
                phonenumber: '123-456-7890',
                address: '123 Some Street',
                allergies: ['nuts', 'dairy'],
                profilePictureUrl: 'img/Ri5ABTvvRhS9y3Vveuq8_profile.jpg',
                earning: 0
            }
        },
        '32': {
            userId: '32',
            email: 'johume@email.test',
            userType: 'customer',
            attributes: {
                rating: 4.7,
                name: 'Ramyaa',
                phonenumber: '123-456-7890',
                address: '123 Some Street',
                allergies: ['nuts', 'dairy'],
                profilePictureUrl: 'img/Ri5ABTvvRhS9y3Vveuq8_profile.jpg',
                earning: 0
            }
        }
    };

    var meals = {
        '12': {
            mealId : '12',
            mealName : 'Pesto Tomato Pasta',
            mealDescription : 'Pasta cooked with pesto and tomato sauce.',
            userId : '32',
            location : { latitude: '1234', longitude: '4321' },
            numberAvailable : 3,
            price : 600, // in cents
            allergies : ['nuts', 'dairy'],
            creationTime : 1493175386468, // in epoch millis
            pickupTime : "8pm", // in epoch millis
            attributes : {
                pictures: [
                    'img/bA9sdBanT0CHmS4OiTV5_pasta.jpg',
                    'img/cbIUxSv9Sq2JSc5W4SDj_pasta.jpg',
                    'img/nNnVunYXTwGLL4R2KTuL_Spaghetti_carbonara.jpg'
                ],
                mealIngredients: ['Pasta', 'Tomatoes', 'Nuts', 'Pesto'],
                feedsHowMany: 2
            }
        },
        '13': {
            mealId : '13',
            mealName : 'Vegetable Samosa',
            mealDescription : '',
            userId : '32',
            location : { latitude: '1234', longitude: '4321' },
            numberAvailable : 3,
            price : 400, // in cents
            allergies : [],
            creationTime : 1493175386468, // in epoch millis
            pickupTime : "9pm", // in epoch millis
            attributes : {
                pictures: [
                    'img/Ml0ZToUfQ46lVTmxfbhJ_samosa.jpg',
                    'img/M5QHPka1SyiRkRdzHpsi_samosa.jpg',
                    'img/RDxDCxoTe6YW5EQOqK9l_samosa.jpg'
                ],
                mealIngredients: ['Potatoes', 'Salt', 'Peas', 'Wheat'],
                feedsHowMany: 1
            }
        },
        '14': {
            mealId : '14',
            mealName : 'Grilled Chicken Sandwich',
            mealDescription : 'Grilled chicked on whole wheat bread with avocados',
            userId : '32',
            location : { latitude: '1234', longitude: '4321' },
            numberAvailable : 4,
            price : 500, // in cents
            allergies : ['nuts', 'soy', 'dairy'],
            creationTime : 1493139600000, // 2017-04-25 10AM UTC-7 epoch millis
            pickupTime : "7pm", // 2017-04-25 8PM UTC-7 epoch millis
            attributes : {
                pictures: [
                    'img/gc1.jpg',
                    'img/gc2.png'
                ],
                mealIngredients: [
                    'Wheat bread',
                    'Grilled Chicken',
                    'Tomatoes',
                    'Mushrooms',
                    'spinach'
                ],
                feedsHowMany: 1
            }
        }
    };

    var mealOrders = {};

    var indexes = {};

    var init = function () {

        createMealOrder('14', null);
        createMealOrder('14', 1493176178215);
        var orderToCompleteId = createMealOrder('14', null).id;
        updateMealOrder(orderToCompleteId, {
            mealOrderStatus: 'Completed',
            rating: 4.5
        });
    };

    var getLoginUserId = this.getLoginUserId = function () {
        return loginUserId;
    };

    var nextIndex = function (indexName) {
        var nextIndex = indexes[indexName] || 0;
        indexes[indexName] = nextIndex + 1;
        return nextIndex;
    };

    var nextMealOrderIndex = function () {
        return nextIndex('mealOrder');
    };

    this.getUser = function (success, failure) {
        success(users[getLoginUserId()]);
    };

    this.getUserById = function (id) {
        return users[id];
    };

    this.updateUser = function (attributes) {
        update(users[getLoginUserId()].attributes, attributes);
    };

    var update = function (object, attributes) {
        Object.keys(attributes).forEach(function (k) {
            object[k] = attributes[k];
        });
    };

    this.queryMealsByLocation = function (location) {
        return clone(Object.values(meals)
            .filter(function (x) {
                return x.numberAvailable > 0;
            })
        );
    };

    this.createMeal = function (meal) {
        var id = nextIndex('meal');
        var newMeal = clone(meal);
        newMeal.mealId = id;
        newMeal.userId = getLoginUserId();
        newMeal.creationTime = getCurrentMillis();
        meals[id] = newMeal;
        return id;
    };

    this.updateMealById = function (id, attributes) {
        update(meals[mealId], attributes);
    };

    var queryMealsByMealId = this.queryMealsByMealId = function (id) {
        return meals[id];
    };

    var createMealOrder = this.createMealOrder = function (
        mealId, requestedPickupTime, message
    ) {
        var meal = meals[mealId];

        if (meal.numberAvailable < 1) {
            return { error: 'NoneAvailable' };
        }
        meal.numberAvailable--;

        var id = nextMealOrderIndex();
        var order = {
            mealOrderId : id,
            mealId : mealId,
            customerUserId : getLoginUserId(),
            chefUserId : meal.userId,
            pickupTime : meal.pickupTime,
            creationTime : getCurrentMillis(),
            mealOrderStatus : 'InProgress'
        };

        if (requestedPickupTime) {
            order.requestedPickupTime = requestedPickupTime;
        }
        if (message) {
            order.message = message;
        }
        mealOrders[id] = order;

        return {id: id};
    };

    var updateMealOrder = this.updateMealOrder = function (
        orderId, attributes)
    {
        update(mealOrders[orderId], attributes);
    }

    var getCurrentMillis = function () {
        return new Date().getTime();
    };

    this.queryMealOrdersByCustomerUserId = function () {
        return clone(Object.values(mealOrders)
            .filter(function (x) {
                return x.customerUserId === getLoginUserId();
            })
            .map(function (x) {
                x.meal = queryMealsByMealId(x.mealId);
                return x;
            })
        );
    };

    this.getMealOrdersByChefUserId = function () {
        return (Object.values(mealOrders)
            .filter(function (x) {
                return x.chefUserId === getLoginUserId();
            })
            .map(function (x) {
                x.meal = queryMealsByMealId(x.mealId);
                return x;
            })
        );
    };

    this.facebookLogin = function (authData, userType, location, success, failure) {
        var id = authData.id;
        var user = users[id];

        if (!user) {
            user = {
                userId: id,
                attributes: {
                    rating: null,
                    phonenumber: '',
                    address: location.address,
                    allergies: [],
                    earning: 0
                }
            };
            users[id] = user;
        }

        user.email = authData.email;
        user.userType = userType;

        user.attributes.name = authData.displayName;
        user.attributes.profilePictureUrl = authData.profileImageURL;

        loginUserId = id;

        success(id);
    };

    var clone = x => JSON.parse(JSON.stringify(x));

    init();
}]);
