angular.module('app.controllers', [])

.controller('chefyCtrl', [
    '$scope', '$stateParams','$state', 'backend',
function ($scope, $stateParams,$state, backend) {
    var isDebugging = true;
    $scope.isDebugging = isDebugging;
    $scope.user = { type: "customer" };
    $scope.toggleUserType = () => {
        var type = $scope.user.type;
        if (type === 'customer') {
            type = 'chef';
        } else if (type === 'chef') {
            type = 'customer';
        }
        $scope.user.type = type;
    };

    $scope.logout = function() {
        $scope.authData = null;
        $state.go('login');
        location.reload();
    }
}])


.controller('dashboardCtrl', [
    '$scope', '$stateParams', 'backend', 'location', 'notifier','$http', 'FileUploader', 'Upload',
function ($scope, $stateParams, backend, location, notifier,$http, FileUploader, Upload) {
    $scope.serverIsProcessing = false;
    $scope.serverResponse = {};
    $scope.allFiles = {};
    $scope.errorAnnouncement = {};
    $scope.alternativeBusiness = {}
    $scope.AIHoundifyResponse = "";
    progressJs().setOption("theme", "green").start().autoIncrease(4, 500);
    console.log('here is the state Params', $stateParams.sessionId);
    $scope.sessionID = $stateParams.sessionId;
    if($stateParams.sessionId==null){
        $stateParams.sessionId = "NA"
    }

    var bestSellersData = {
        datasets: [{
            data: [20, 15, 20, 35, 10],
            backgroundColor: [
                '#ee5b5b',
                '#fcd53b',
                '#0bdbb8',
                '#464dee',
                '#0ad7f7'
            ],
            borderColor: [
                '#ee5b5b',
                '#fcd53b',
                '#0bdbb8',
                '#464dee',
                '#0ad7f7'
            ],
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Automotive',
            'Books',
            'Software',
            'Toys',
            'Video games'
        ]
    };
    var bestSellersOptions = {
        responsive: true,
        cutoutPercentage: 80,
        legend: {
                display: false,
        },
        animation: {
                animateScale: true,
                animateRotate: true
        },
        plugins: {
            datalabels: {
                 display: false,
                 align: 'center',
                 anchor: 'center'
            }
        }				

    };
    if ($("#bestSellers").length) {
        var pieChartCanvas = $("#bestSellers").get(0).getContext("2d");
        var pieChart = new Chart(pieChartCanvas, {
            type: 'doughnut',
            data: bestSellersData,
            options: bestSellersOptions
        });
    }

    function createLoanChart2 (data) {

        console.log('here is the loan data', data);

        let labels = [];
        let datalabels = [];

        for(var i=0; i<data.current_liabilities.length; i++){
            labels[i] = data.current_liabilities[i].date;
            datalabels[i] = data.current_liabilities[i].amount 
        }


    var areaData = {
        labels: labels,
        datasets: [{
          label: 'Debt left',
          data: datalabels,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 2,
          fill: true, // 3: no fill
        }]
      };
      var areaOptions = {
        plugins: {
          filler: {
            propagate: true
          }
        }
      }

    if ($("#areaChart").length) {
        var areaChartCanvas = $("#areaChart").get(0).getContext("2d");
        var areaChart = new Chart(areaChartCanvas, {
          type: 'line',
          data: areaData,
          options: areaOptions
        });
      }
    }

function createLoanChart (mockData) {

  console.log("3########", mockData)
    
    let current_liabilities_labels = [];
    let current_liabilities_datalabels = [];
    let interest_labels = [];
    let interest_datalabels = [];

    let reduced_liabilities_labels = [];
    let reduced_liabilities_datalabels = [];
    let reduced_interest_labels = [];
    let reduced_interest_datalabels = [];

    for(var i=0; i<mockData.current_liabilities.length; i++){
        current_liabilities_labels[i] = mockData.current_liabilities[i].date;
        current_liabilities_datalabels[i] = mockData.current_liabilities[i].amount;

        reduced_liabilities_labels[i] = mockData.reduced_liabilities[i].date;
        reduced_liabilities_datalabels[i] = mockData.reduced_liabilities[i].amount;
    }

    var multiAreaData = {
        labels: current_liabilities_labels,
        datasets: [{
            label: 'Item 1 Original Price',
            data: current_liabilities_datalabels,
            borderColor: ['rgba(255,165,0, 0.5)'],
            backgroundColor: ['rgba(54, 162, 235, 0.5)'],
            borderWidth: 1,
            fill: true
          },
          {
            label: 'Item 1 Predicted Price',
            data: reduced_liabilities_datalabels,
            borderColor: ['rgba(50,205,50, 0.5)'],
            backgroundColor: ['rgba(50,205,50, 0.5)'],
            borderWidth: 1,
            fill: true
          }
        ]
      };

    var multiAreaOptions = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };


      var multiAreaOptions = {
        plugins: {
          filler: {
            propagate: true
          }
        },
        elements: {
          point: {
            radius: 1
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              beginAtZero: true
            }
          }],
          yAxes: [{
            gridLines: {
              display: false
            }
          }]
        }
      }

      if ($("#areachart-loan").length) {
        var multiAreaCanvas = $("#areachart-loan").get(0).getContext("2d");
        var multiAreaChart = new Chart(multiAreaCanvas, {
          type: 'line',
          data: multiAreaData,
          options: multiAreaOptions
        });
      }
    }


      function createDailyExpenseChart (data) {
          let labels = [];
          let datalabels = [];
          let spendwiseLabels = []

          console.log('HERE IS DATA', data)

        for(var i=0; i<data.daily_expenses.length; i++){
            labels[i] = data.daily_expenses[i].date;
            datalabels[i] = data.daily_expenses[i].amount 
            spendwiseLabels[i] = 0;

            console.log('here are the ###', spendwiseLabels, datalabels )
        }
        for(var i = 0; i< data.predictions.length; i++) {
            labels[i] = data.predictions[i].date;
            spendwiseLabels[i] = data.predictions[i].amount
        }

        console.log('here are the labels', spendwiseLabels, datalabels )
      var multiAreaData = {
        labels: labels,
        datasets: [
            {
                label: 'Without CostCurve',
                data: spendwiseLabels,
                borderColor: ['rgba(255, 99, 132, 0.5)'],
                backgroundColor: ['rgba(50,205,50, 0.5)'],
                borderWidth: 0.1,
                fill: true
              },
            {
            label: 'With CostCurve',
            data: datalabels,
            borderColor: ['rgba(255, 99, 132, 0.5)'],
            backgroundColor: ['rgba(255,215,0, 0.5)'],
            borderWidth: 0.1,
            fill: true
          }
        ]
      };

      var multiAreaOptions = {
        plugins: {
          filler: {
            propagate: true
          }
        },
        elements: {
          point: {
            radius: 0.1
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            gridLines: {
              display: false
            }
          }]
        }
      }

      if ($("#areachart-multi").length) {
        var multiAreaCanvas = $("#areachart-multi").get(0).getContext("2d");
        var multiAreaChart = new Chart(multiAreaCanvas, {
          type: 'line',
          data: multiAreaData,
          options: multiAreaOptions,
          lineAtIndex: [4]
        });
      }

    }

    function createDailyExpenseChart2(data) {
      // Your code here to render the chart using the provided data

      var mockData = {
        daily_expenses: [
            { date: "2022-01-01", amount: 100 },
            { date: "2022-01-02", amount: 200 },
            { date: "2022-01-03", amount: 300 }
        ],
        predictions: [
            { date: "2022-01-01", amount: 70 },
            { date: "2022-01-02", amount: 150 },
            { date: "2022-01-03", amount: 200 }
        ]
    };

      console.log('///////0', mockData.daily_expenses)

      createDailyExpenseChart(mockData);

    }

    
    


      var transcriptElt = document.getElementById("query");
      
      var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      var recognition = new SpeechRecognition();

      recognition.onstart = function() {
        console.log('Voice recognition started. Try speaking into the microphone.');
      }

      recognition.onspeechend = function() {
        console.log('You were quiet for a while so voice recognition turned itself off.');
      }

      recognition.onerror = function(event) {
        if(event.error == 'no-speech') {
          console.log('No speech was detected. Try again.');
        }
      }

      recognition.onresult = function(event) {
        var current = event.resultIndex;
        var transcript = event.results[current][0].transcript;
        transcriptElt.value = transcript;
        console.log('Transcript: ', transcript);


        $http.get('https://127.0.0.1:8010/?inputmessage=' + encodeURIComponent(transcript))
        .then(function(response) {
            $scope.AIHoundifyResponse = response.data;
            console.log("here is GENAI response", response, $scope.AIHoundifyResponse)
        });



        
      }

      $scope.onMicrophoneClick = function () {
        if (recognition && recognition.recognizing) {
          recognition.stop();
          return;
        }

        recognition.start();
        document.getElementById("query").readOnly = true;  
      }

      
    // headers: {'Content-Type': undefined, 'X-Session-Token': $stateParams.sessionId}
    // progressJs().start().autoIncrease(4, 500);
    var update = () => {
        // var method = backend.getAllItems();
        // $scope.files = method.all();
        // console.log('here are the files ', $scope.files );

        $scope.getOffers(); 
        $scope.monthlyExpenses();
        $scope.dailyExpenses();
        $scope.getLoanInfo();
        $scope.getSavings(); 
        $scope.savingsRecommendationsTable();
        $scope.mockSavingsRecommendationsTable();
        $scope.getItemList();
        $scope.itemSelected("Butter Chicken")
            


    };
    notifier.addListener(update);
    

    $scope.getLoanInfo = function() {
        
        $http.get('https://cost-curve-ss54heax2q-uc.a.run.app/deltaMargin')
        .success(function (data, status) {
            // console.log('1', data)
            console.log('Loan Data', data, $scope.loanData);
            $scope.loanData  = data.Predicted_Delta_Margin;
          
            // createLoanChart(data);
            }).error(function (data, status) {
            console.log('There was a getting loan info' + JSON.stringify(data) + JSON.stringify(status));
           })
    }

    $scope.getItemList = function() {
        var itemsList = [
              "Gulab Jamun",
              "Chole Bhature",
              "Biryani",
              "Butter Chicken",
              "Paneer Tikka",
              "Rogan Josh",
              "Samosa",
              "Palak Paneer",
              "Masala Dosa",
              "Tandoori Chicken"
          ]
        $scope.itemsList = itemsList;
        console.log('Mock item Data', $scope.itemsList);
    }

    // $scope.itemSelected = function(selectedItem) {
    //     console.log('User selected item: ', selectedItem);

    //     var currentDate = new Date();
    //     var pricingData = [];
    //     for (var i = 0; i < 12; i++) {
    //         var monthAhead = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    //         var formattedDate = monthAhead.getFullYear() + '-' + (monthAhead.getMonth() + 1) + '-' + monthAhead.getDate();
    //         var data = {
    //             "item_name": selectedItem,
    //             "date": formattedDate
    //         };

    //         console.log("here is the DATA", data)
    //         $http.post('https://c880-71-212-16-67.ngrok-free.app/predict', data, {
    //           headers: {
    //               'Content-Type': 'application/json'
    //           }
    //       })
    //         .success(function (response) {
    //             pricingData.push(response);
    //         })
    //         .error(function (error) {
    //             console.log('Error: ' + error);
    //         });
    //     }
    //     console.log('Pricing Data: ', pricingData);

    //     createLoanChart()

    // }

        $scope.itemSelected = function(selectedItem) {
        console.log('User selected item: ', selectedItem);

        var currentDate = new Date();
        var pricingData = [];
        // for (var i = 0; i < 12; i++) {
        //     var monthAhead = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
        //     var formattedDate = monthAhead.getFullYear() + '-' + (monthAhead.getMonth() + 1) + '-' + monthAhead.getDate();
        //     var data = {
        //         "item_name": selectedItem,
        //         "date": formattedDate
        //     };
        //   }

            var mockData = {
              current_liabilities: [
                {date: '2022-10-01', amount:0},
                  {date: '2022-11-01', amount: 15},
                  {date: '2022-12-01', amount: 15},
                  {date: '2023-01-01', amount: 15},
                  {date: '2023-02-01', amount: 15},
                  {date: '2023-03-01', amount: 15},
                  {date: '2023-04-01', amount: 15},
                  {date: '2023-05-01', amount: 15},
                  {date: '2023-06-01', amount: 15},
                  {date: '2023-07-01', amount: 15},
                  {date: '2023-08-01', amount: 15},
                  {date: '2023-09-01', amount: 15},
                  {date: '2023-10-01', amount: 15}
                ],
              reduced_liabilities: [
                {date: '2022-10-01', amount: 0},
                {date: '2022-11-01', amount: Math.floor(Math.random() * 11) + 15},
                {date: '2022-12-01', amount: Math.floor(Math.random() * 11) + 15},
                {date: '2023-01-01', amount: Math.floor(Math.random() * 11) + 15},
                {date: '2023-02-01', amount: Math.floor(Math.random() * 11) + 15},
                {date: '2023-03-01', amount: Math.floor(Math.random() * 11) + 15},
                {date: '2023-04-01', amount: Math.floor(Math.random() * 11) + 15},
                {date: '2023-05-01', amount: Math.floor(Math.random() * 11) + 15},
                {date: '2023-06-01', amount: Math.floor(Math.random() * 11) + 15},
                {date: '2023-07-01', amount: Math.floor(Math.random() * 11) + 15},
                {date: '2023-08-01', amount: Math.floor(Math.random() * 11) + 15},
                {date: '2023-09-01', amount: Math.floor(Math.random() * 11) + 15},
                {date: '2023-10-01', amount: Math.floor(Math.random() * 11) + 15}
              ]
          }

        console.log('Pricing Data: ', mockData);

        createLoanChart(mockData)

    }

    $scope.getSavings = function() {
        $http.get('https://cost-curve-ss54heax2q-uc.a.run.app/totalSavings')
        .success(function (data, status) {
            console.log('total savings', data);
            $scope.savingsData = data.Predicted_Savings;
             console.log('Mock Savings Data', data, $scope.savingsData);
            }).error(function (data, status) {
            console.log('There was a problem' + JSON.stringify(data) + JSON.stringify(status));
           })
    }


    // $scope.getSavings = function() {
    //     var mockSavingsData = {
    //         "savings_info": {+
    //             "total_savings": 10000,
    //             "monthly_savings": 500,
    //             "daily_savings": 20
    //         },
    //         "details": "Savings details"
    //     };
    //     $scope.savingsData = mockSavingsData;
    //     console.log('Mock Savings Data', mockSavingsData, $scope.savingsData);
    // }

    
    $scope.getOffers = function() {
    
        $http.get('https://cost-curve-ss54heax2q-uc.a.run.app/seasonalItems')
        .success(function (data, status) {
          
          var newdata = [
            {
              "Combo_Name": "Combo 1",
              "Items": [
                {
                  "Item_Description": "Gulab Jamun",
                  "Discount_Percentage": 1.96
                },
                {
                  "Item_Description": "Paneer Tikka",
                  "Discount_Percentage": -6.60
                }
              ],
              "Combo_Discount": -2.32
            },
            {
              "Combo_Name": "Combo 2",
              "Items": [
                {
                  "Item_Description": "Masala Dosa",
                  "Discount_Percentage": 1.15
                },
                {
                  "Item_Description": "Rogan Josh",
                  "Discount_Percentage": -6.40
                }
              ],
              "Combo_Discount": -2.63
            },
            {
              "Combo_Name": "Combo 3",
              "Items": [
                {
                  "Item_Description": "Samosa",
                  "Discount_Percentage": 0.69
                },
                {
                  "Item_Description": "Butter Chicken",
                  "Discount_Percentage": -5.84
                }
              ],
              "Combo_Discount": -2.57
            }
          ]
          
          
          console.log('seasonal items $$$$$', newdata);
          $scope.seasonalItems = newdata;
            }).error(function (data, status) {
            console.log('There was a problem posting your information' + JSON.stringify(data) + JSON.stringify(status));
           })
    }


    // $scope.getOffers = function() {
    //     var mockBusinessData = [
    //         {
    //             "TemplateData": {
    //                 "Title": "Healthy Harvest",
    //                 "BodyText": "123 Green St, Anytown",
    //                 "Image": {
    //                     "URL": "https://www.centralvalleycf.org/wp-content/uploads/2020/09/Healthy-Harvest-ENG-logo.jpg"
    //                 }
    //             }
    //         },
    //         {
    //             "TemplateData": {
    //                 "Title": "Fit & Fresh",
    //                 "BodyText": "456 Oak St, Anytown",
    //                 "Image": {
    //                     "URL": "data:image/png;base64,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"
    //                 }
    //             }
    //         },
    //         {
    //             "TemplateData": {
    //                 "Title": "Lean Cuisine Cafe",
    //                 "BodyText": "789 Pine St, Anytown",
    //                 "Image": {
    //                     "URL": "https://www.madewithnestle.ca/sites/default/files/2021-08/Lean%20Cuisine%20New%20Logo.png"
    //                 }
    //             }
    //         }
    //     ];
    //     console.log('Mock Business Data', mockBusinessData);
    //     $scope.alternativeBusiness = mockBusinessData;
    // }


    $scope.monthlyExpenses = function() {
        $http.get('https://cost-curve-ss54heax2q-uc.a.run.app/monthlyExpense')
        .success(function (data, status) {
            console.log('monthly expenses', data);

            
            var expenses = {"Ingredients":2000,"Miscellaneous":500,"Rent":5000,"Salaries":8000,"Utilities":1500};
            var totalExpenses = Object.values(expenses).reduce((a, b) => a + b, 0);
            console.log('Total Expenses', totalExpenses);

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            
            var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
            $scope.today = `${monthNames[mm - 1]} ${yyyy}`;
            console.log('Today\'s Date', $scope.today);
            $scope.loanData = data.Predicted_Delta_Margin;


            $scope.monthlyExpense = totalExpenses;
            }).error(function (data, status) {
            console.log('There was a problem' + JSON.stringify(data) + JSON.stringify(status));
           })
    }

    // $scope.monthlyExpenses = function() {
    //     var mockData = {
    //         "1": 500,
    //         "2": 600,
    //         "3": 700,
    //         "4": 800,
    //         "5": 900,
    //         "6": 1000,
    //         "7": 1100,
    //         "8": 1200,
    //         "9": 1300,
    //         "10": 1400,
    //         "11": 1500,
    //         "12": 1600
    //     };
    //     const d = new Date();
    //     let month = d.getMonth()+1;
    //     console.log('monthly expenses', mockData[month], month);
    //     $scope.monthlyExpense = mockData[month];
    // }

    $scope.dailyExpenses = function() {

      createDailyExpenseChart2()
        
        // $http.get('http://spendwise-lb-739704597.us-east-2.elb.amazonaws.com/spending_data?days=20')
        // .success(function (data, status) {
        //     console.log('daily expense', data);
        //     $scope.dailyExpense = data;
        //     createDailyExpenseChart($scope.dailyExpense)
        //     }).error(function (data, status) {
        //     console.log('There was a problem' + JSON.stringify(data) + JSON.stringify(status));
        //    })
    }

    $scope.savingsRecommendationsTable = function() {
        $http.get('https://cost-curve-ss54heax2q-uc.a.run.app/seasonalItems')
        .success(function (data, status) {
          
          var data2 = [
            {
              "TemplateData": {
                "BodyText": "Predicted Price: 15.99, Expected Sales: 150",
                "Image": {
                  "URL": "https://imageupload.io/ib/7gdukYHCAkjy0aH_1697095138.png"
                },
                "Title": "Saag"
              }
            },
            {
              "TemplateData": {
                "BodyText": "Predicted Price: 2.99, Expected Sales: 200",
                "Image": {
                  "URL": "https://static.toiimg.com/thumb/56097918.cms?width=1200&height=900"
                },
                "Title": "Makki ki Roti"
              }
            }
          ]
          
          $scope.seasonal_Optimized_Items = data;
          console.log('Seasonal Optimized Items', data, $scope.seasonal_Optimized_Items);
            $scope.savingsRecommendationsTable

            }).error(function (data, status) {
            console.log('There was a problem' + JSON.stringify(data) + JSON.stringify(status));
           })
    }

    $scope.mockSavingsRecommendationsTable = function() {
        var mockData = {
            "1": {
                "vendor": "Local Diner",
                "category": "Dining",
                "expected_expense": 400,
                "savings": 200
            },
            "2": {
                "vendor": "Expensive Grocer",
                "category": "Groceries",
                "expected_expense": 300,
                "savings": 150
            },
            "3": {
                "vendor": "Streaming Service",
                "category": "Subscriptions",
                "expected_expense": 150,
                "savings": 100
            },
            "4": {
                "vendor": "Utility Company",
                "category": "Utilities",
                "expected_expense": 100,
                "savings": 50
            }
        };
        console.log('mock savings recommendations', mockData);
        $scope.savingsRecommendationsTable = mockData;
    }

    $scope.search = function(string) {
        $scope.searchResults = {};
        console.log ("string to search for is", string);
        var endpoint = 'https://sbe.soundsearch.io';
        $http(
            {
               method: 'Get',
               url: endpoint + '/searchItems?query=' + string,
               headers: { 'X-Session-Token': 'b445f1f8-319c-40c5-a47b-e0d95e27ab6b' }
            }).then(function success(response) {
                // console.log('here are the files ', response.data, response.data.items.length);
                // for (var i = 0; i< response.data.items.length; i++ ) {
                //     response.data.items[i].DateUploaded = (new Date(response.data.items[i].fileUploadDateMillis)).toString()
                //     console.log('here is the date uploaded', response.data.items[i])
                // }
                console.log('here are the search results', response);
                $scope.searchResults = response;
                return $scope.searchResults;
            }, function error(response) {
               console.log ("Error occured while trying to fetch data", response)
               return response;
        });
    }

    $scope.reset = function () {
        $scope.searchResults = null;
        console.log ('search results are', $scope.searchResults);
    }

    $scope.startPollingStatus = function(statusQueryUrl) {
        $scope.serverIsProcessing = true;
        console.log('statusQueryUrl',statusQueryUrl);
    
        const intervalId = window.setInterval(() => {

            $http(
                {
                   method: 'Get',
                   url: statusQueryUrl,
                   headers: { 'X-Session-Token': 'b445f1f8-319c-40c5-a47b-e0d95e27ab6b'}
                }).then(function success(response, status, headers, config) {
                    console.log('here are the server results', response.data);
                    $scope.serverResponse.success = response.data.success;
                    $scope.serverResponse.processStep = response.data.processStep;
                    $scope.serverResponse.fileName = response.data.fileName;
                        
                    if (response.data.transcriptionText) {
                        $scope.serverIsProcessing = false;
                        $scope.serverResponse.transcriptionText = response.data.transcriptionText;
                        $scope.serverResponse.transcriptionEntities= response.data.transcriptionEntities ;
                        $scope.serverResponse.processStep = response.data.processStep;
                        window.clearInterval(intervalId);
                    }

                    if (response.data.errorMessage) {
                        $scope.serverIsProcessing = false;
                        console.log ('here is the error message', response.data.errorMessage);
                        $scope.serverResponse.errorMessage = response.data.errorMessage;
                        $scope.serverResponse.processStep = response.data.processStep;
                        $scope.errorAnnouncement.processFailure = response.data.errorMessage;
                        window.clearInterval(intervalId);
                      }


                }, function error(data, status, headers, config) {
                   console.log ("Error occured while trying to fetch data", data)
                   return data;
            });

        }, 4000);
      };

      $scope.showCard = function() {
          $scope.uploadfilecard = !$scope.uploadfilecard;
      }
///////////////////
    const newformData = new FormData();

    newformData.append('user-token', 'happy-seagull')
    console.log("&&&&&",  newformData)
    var uploader = $scope.uploader = new FileUploader({
        url: 'https://pbe.soundsearch.io/upload'
    });

    // FILTERS

    //a sync filter
    uploader.filters.push({
        name: 'syncFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            console.log('syncFilter');
            return this.queue.length < 10;
        }
    });

    // an async filter
    uploader.filters.push({
        name: 'asyncFilter',
        fn: function(item /*{File|FileLikeObject}*/, options, deferred) {
            console.log('asyncFilter');
            setTimeout(deferred.resolve, 1e3);
        }
    });

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
        $scope.filetosend = fileItem.file;
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        const addformData = new FormData();

        addformData.append('user-token', 'happy-seagull')
        addformData.append("file", $scope.filetosend)

        item.formData = addformData;
        item.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
          };
            console.log(item);
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem####', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };

    console.info('uploader', uploader);

///////////////////////////
    $scope.uploadFile = function(file) {
        $scope.validFile = false;
        console.log('what are file', file)
        progressJs().start().autoIncrease(1, 900);
        $scope.serverResponse.processStep = "Uploading";
        $scope.serverResponse.fileName = file.name
        var fd = new FormData();
        //Take the first selected file
        fd.append("file", file);
        fd.append('user-token', 'big-seagull');
        console.log('here is the file to upload', fd);
        $http.post('https://sbe.soundsearch.io/upload', fd, {
            headers: {'Content-Type': undefined, 'X-Session-Token': 'b445f1f8-319c-40c5-a47b-e0d95e27ab6b' },
        }).success(function (data, status, headers, config) {
            progressJs().end();
            console.log('saving data for customer', JSON.stringify(data), JSON.stringify(status));
            $scope.serverResponse.statusQueryUrl = data.jobs[0].statusQueryUrl;
            $scope.startPollingStatus($scope.serverResponse.statusQueryUrl);
            }).error(function (data, status, headers, config) {
                $scope.serverResponse.processStep = "UploadError"
                progressJs().end();
                $scope.errorAnnouncement.uploadfile = data.errorMessage;
            console.log('There was a problem posting your information' + JSON.stringify(data) + JSON.stringify(status));
           })
    };
    $scope.validFile = false;
    $scope.checkfile = function (file) {
        console.log('check file', file[0]);
        $scope.serverResponse = {};
        if (file[0] && file[0].size > 0) {
            console.log ("setting true");
            $scope.validFile = true;
          } else {
            $scope.validFile = false;
          }
          $scope.$apply();
    }
// ////////////////////////////////////////

//     $scope.submit = function() {
//         if ($scope.form.file.$valid && $scope.file) {
//           $scope.upload($scope.file);
//         }
//       };
//   // upload on file select or drop
//       $scope.upload = function (file) {
//           Upload.upload({
//               url: 'upload/url',
//               data: {file: file}
//           }).then(function (resp) {
//               console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
//           }, function (resp) {
//               console.log('Error status: ' + resp.status);
//           }, function (evt) {
//               var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
//               console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
//           });
//       };
  

      $scope.submit = function(file) {
          console.log("check out file", file);

          var fds = new FormData();
          //Take the first selected file
          fds.append("file", file);
          fds.append('user-token', 'happy-seagull');
            console.log("here is fd", fds)

            Upload.upload({
                url: 'https://pbe.soundsearch.io/upload',
                method: 'POST',
                body: {'file': file, 'user-token': 'happy-seagull'},
                headers: { 'Content-Type': undefined, 'X-Session-Token': $stateParams.sessionId }
            }).then(function (resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function (resp) {
                console.log('Error status: ' + JSON.stringify(resp));
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });

        // Upload.upload({
        //   url: 'https://pbe.soundsearch.io/upload',
        //   method: 'POST',
        //   data: {file: file, 'user-token': 'happy-seagull'}
        // });
    
        // file.upload.then(function (response) {
        //   $timeout(function () {
        //     file.result = response.data;
        //   });
        // }, function (response) {
        //   if (response.status > 0)
        //     $scope.errorMsg = response.status + ': ' + response.data;
        // }, function (evt) {
        //   // Math.min is to fix IE which reports 200% sometimes
        //   file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        // });
        }

        update();

}])


.controller('detailsCtrl', [
    '$scope', '$stateParams', 'backend', 'notifier','$http',
function ($scope, $stateParams, backend, notifier,$http) {

    console.log('here is the stateparams', $stateParams);
    var update = () => {
        var endpoint = 'https://sbe.soundsearch.io';
        $http(
            {
               method: 'Get',
               url: endpoint + '/getItemDetails?itemId=' + $stateParams.itemId,
               headers: {'Content-Type': undefined, 'X-Session-Token': 'b445f1f8-319c-40c5-a47b-e0d95e27ab6b'},

            }).then(function success(response) {
                console.log('here are the details ', response.data);
                $scope.details = response.data.item;
        
            }, function error(response) {
               // called asynchronously if an error occurs
               // or server returns response with an error status.
               console.log ("Error occured while trying to fetch data", response)
               return response;
        });

    };
    notifier.addListener(update);
    update();
}])

.controller('requestANewMealCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('mapsExampleCtrl', ['$scope', 'uiGmapGoogleMapApi', function($scope, uiGmapGoogleMapApi) {
    // Do stuff with your $scope.
    // Note: Some of the directives require at least something to be defined originally!
    // e.g. $scope.markers = []

    // uiGmapGoogleMapApi is a promise.
    // The "then" callback function provides the google.maps object.
    uiGmapGoogleMapApi.then(function(maps){
        // Configuration needed to display the road-map with traffic
        // Displaying Ile-de-france (Paris neighbourhood)
        $scope.map = {
            center: {
              latitude: -23.598763,
              longitude: -46.676547
            },
            zoom: 13,
            options: {
                mapTypeId: google.maps.MapTypeId.ROADMAP, // This is an example of a variable that cannot be placed outside of uiGmapGooogleMapApi without forcing of calling the google.map helper outside of the function
                streetViewControl: false,
                mapTypeControl: false,
                scaleControl: false,
                rotateControl: false,
                zoomControl: false
            },
            showTraficLayer:true
        };
    });
}])

.controller('settingsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

    $scope.distance = 3;//default distance
    $scope.price = 20;//default max price


}])

.controller('profileCtrl', ['$scope', '$stateParams', 'backend', 'notifier', '$http',
function ($scope, $stateParams, backend, notifier, $http) {
    $scope.currentAllergy = "";
    var update = () => {
        backend.getUser(
            user => {
                $scope.user = user;
                $scope.user.type = $scope.user.userType;
                var a = $scope.user.attributes;
                $scope.name = a.name;
                $scope.profilePicture = a.profilePictureUrl;
                $scope.phoneNumber = a.phonenumber;
                $scope.address = a.address;
                $scope.allergies = a.allergies;
            },
            error => {
                console.log(error);
            }
        );
    };
    update();

    $scope.addAllergy = (currentAllergy) => {
        console.log($scope.currentAllergy);
        if (currentAllergy) {
            console.log($scope.currentAllergy);
            $scope.allergies.push(currentAllergy);
            $scope.currentAllergy = "";
        }
    };

    $scope.removeAllergy = (allergy) => {
        $scope.allergies.splice($scope.allergies.indexOf(allergy),1);
    };


    notifier.addListener((message) => {
        if (message !== 'login') { return; }
        update();
    });

    $scope.save = () => {
        backend.updateUser({
            phonenumber: $scope.phoneNumber,
            address: $scope.address
        });
    };



}])

.controller('orderMealCtrl', [
    '$scope',
    '$stateParams',
    'backend',
    'location',
    '$state',
    'notifier',
    '$timeout',
    '$ionicModal',
function (
    $scope, $stateParams, backend, location, $state, notifier, $timeout, $ionicModal
) {
    var mealId = $stateParams.mealId;
    var meal = backend.queryMealsByMealId(mealId);
    meal.chef = backend.getUserById(meal.userId);
    var userLocation = location.getLocation();
    $scope.distance = location.distanceBetweenInMeters(
        meal.location, userLocation);
    $scope.meal = meal;
    $scope.centToDollarString = centToDollarString;

     $ionicModal.fromTemplateUrl('templates/transactionComplete.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
    $scope.closeLogin = function() {
    $scope.modal.hide();
  };

    $scope.placeOrder = function () {
         
        var response =
            backend.createMealOrder(mealId, null, $scope.message);

        $scope.response = response;
$scope.modal.show();
        // $scope.isOrdered = true;
        // if (response.error !== 'NoneAvailable') {
        //     $timeout(() => {
        //         $scope.isOrdered = false;
        //     }, 3000);
        // }



        notifier.notify();
    };
}])

.controller('loginCtrl', [
    '$scope',
    '$stateParams',
    '$state',
    '$http',
    '$firebaseArray',
    'backend',
    'notifier',
function ($scope, $stateParams,$state, $http, $firebaseArray, backend, notifier) {
    var coordinates;
    var loginData = new URLSearchParams();

    $scope.selectIdentity = function(identity){
        // identity can only be customer or chef
        $scope.user.type = identity;
    };

    $scope.auth = firebase.auth();
    $scope.login = function() {
        $state.go('dashboard');
        console.log("Loging");
        // var provider = new firebase.auth.GoogleAuthProvider();
        // $scope.auth.signInWithPopup(provider).then(function(user) {
        //     // the access token will allow us to make Open Graph API calls.
        //     if(user.user.uid) {
        //     console.log("Logged in as", JSON.stringify(user), user);
        //     // $scope.authData = user.user;
        //     // $scope.userKey = $scope.authData.uid;
		//     // $scope.userDisplayName = $scope.authData.displayName;
        //     // $scope.userUrl = $scope.authData.photoUrl;

        //     console.log('I am going to append', $scope.authData.uid, $scope.authData.Ed);

        //     loginData.append('uid', $scope.authData.uid);
        //     loginData.append('access-token', $scope.authData.Ed);


        //     // $http(
        //     //     {
        //     //        method: 'Post',
        //     //        url: 'https://sbe.soundsearch.io/login',
        //     //        data: 'uid='+$scope.authData.uid+'&access-token='+$scope.authData.Ed,
        //     //        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        //     //     }).then(function success(response) {
        //     //         console.log('here are the details ', response.data);
        //     //         $scope.details = response.data.item;
        //     //         $state.go('dashboard', { 'sessionId': response.data.sessionId});
        //     //     }, function error(response) {
        //     //        // called asynchronously if an error occurs
        //     //        // or server returns response with an error status.
        //     //        console.log ("Error occured while trying to fetch data", response)
        //     //        return response;
        //     // });


        //     } else {
        //         console.log("login Unsuccessful")
        //     }
        // });
    }

    $scope.signOut = function() {
        //signout Firebase
        $scope.auth.signOut();
      };

      $scope.auth.onAuthStateChanged = function(user) {
          console.log('here is the user credentials', user);
        if (user) { // User is signed in!
          // Get profile pic and user's name from the Firebase user object.
          var profilePicUrl = user.photoURL;
          var userName = user.displayName;

          // Set the user's profile pic and name.
          $scope.userPic.style.backgroundImage = 'url(' + profilePicUrl + ')';
          $scope.userName.textContent = userName;

        } else { // User is signed out!
          // Hide user's profile and sign-out button.
          console.log('User is not authenticated');
        }
      };

      $scope.checkSignedInWithMessage = function() {
        // Return true if the user is signed in Firebase
        if (this.auth.currentUser) {
          return true;
        }

        // Display a message to the user using a Toast.
        var data = {
          message: 'You must sign-in first',
          timeout: 2000
        };
        this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
        return false;
      };

  $scope.savefbinfo  = function() {
    var userData = {
        "userType": $scope.user.type,
        "name": $scope.authData.displayName,
        "email": $scope.authData.email,
        "profilePictureUrl": $scope.authData.profileImageURL,
        "fbToken": $scope.authData.accessToken
    };

    //   $http.post('http://sample-env.57ce6ghwcr.us-west-2.elasticbeanstalk.com', userData)
    // .success(function (data, status, headers, config) {
    //   console.log('saving data for customer', JSON.stringify(data), JSON.stringify(status));
    // }).error(function (data, status, headers, config) {
    //     console.log('There was a problem posting your information' + JSON.stringify(data) + JSON.stringify(status));
    // });

  };


}])

.controller('usersNearbyCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('usersNearby2Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('orderCartCtrl', [
    '$scope', '$stateParams', 'backend', 'notifier',
function ($scope, $stateParams, backend, notifier) {
    var update = () => {
        var orders = backend.getMealOrdersByChefUserId();
        $scope.orders = orders;
        $scope.orderStatusIs = function (status) {
            return function (order) {
                return order.mealOrderStatus === status;
            };
        };
    };
    notifier.addListener(update);
    update();
}])

.controller('createYourMealCtrl',
function ($scope, $stateParams, backend, notifier, $timeout, $ionicModal) {
    $scope.meal = {
        allergies: [],
        attributes: {
            feedsHowMany: 1
        }
    };

    $ionicModal.fromTemplateUrl('templates/postedComplete.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
    $scope.closeLogin = function() {
    $scope.modal.hide();
  };

    $scope.selectedAllergy = null;
    $scope.mealAllergies = [];

    $scope.addAllergy = (allergy) => {
        $scope.mealAllergies.push(allergy);
    };

    $scope.removeAllergy = function (allergy) {
        console.log($scope.mealAllergies.indexOf(allergy));
        $scope.mealAllergies.splice(($scope.mealAllergies.indexOf(allergy)),1);
    };

    $scope.price = 3;

    var hourAsMillis = 60 * 60 * 1000;
    var now = new Date();
    $scope.time = new Date(now.getTime() + 4 * hourAsMillis);

    $scope.displayTime = function (time) {
        var millis = Date.parse(time);
        return time ? new Date(millis).toString() : 'Enter a time';
    };

    $scope.submit = function () {
        var meal = $scope.meal;
        meal.price = $scope.price * 100;
        meal.pickupTime = Date.parse($scope.time);
        meal.numberAvailable = 1;
        backend.createMeal(meal);

        $scope.isSubmitted = true;
        $timeout(() => {
            $scope.isSubmitted = false;
        }, 3000);

         $scope.modal.show();

        notifier.notify();
    };
})

var centToDollarString = function (cent) {
    var s = '' + cent;
    var decimalIndex = s.length - 2;
    return s.substring(0, decimalIndex) + '.' + s.substring(decimalIndex);
};
