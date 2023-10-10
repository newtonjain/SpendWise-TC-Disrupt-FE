// This is the main package for the pricepredictor.go file
package main

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {

	r := mux.NewRouter()
	r.HandleFunc("/monthlyExpense", monthlyExpenseHandler).Methods("GET")
	r.HandleFunc("/totalSavings", totalSavingsHandler).Methods("GET")
	r.HandleFunc("/deltaMargin", deltaMarginHandler).Methods("GET")
	r.HandleFunc("/itemList", itemListHandler).Methods("GET")
	r.HandleFunc("/predictedPrice", predictedPriceHandler).Methods("GET")
	r.HandleFunc("/predictedRevenue", predictedRevenueHandler).Methods("GET")
	r.HandleFunc("/seasonalItems", seasonalItemsHandler).Methods("GET")
	http.ListenAndServe(":8080", r)
}

func monthlyExpenseHandler(w http.ResponseWriter, r *http.Request) {
	// Your code here
	// monthlyExpenseHandler should return the monthly expense data in JSON format Monthly Expense Data
	expenseData := map[string]float64{
		"Rent":          5000,
		"Salaries":      8000,
		"Utilities":     1500,
		"Ingredients":   2000,
		"Miscellaneous": 500,
	}

	json.NewEncoder(w).Encode(expenseData)
}

func totalSavingsHandler(w http.ResponseWriter, r *http.Request) {
	// Your code here
	// totalSavingsHandler should return the total savings data in JSON format Total Savings Data
	savingsData := map[string]float64{
		"Predicted Savings": 2000,
	}

	json.NewEncoder(w).Encode(savingsData)
}

func deltaMarginHandler(w http.ResponseWriter, r *http.Request) {
	// Your code here
	// deltaMarginHandler should return the delta margin data in JSON format Delta of Margin because of Application based on an item
	deltaMarginData := map[string]float64{
		"Predicted Delta Margin": 1500,
	}

	json.NewEncoder(w).Encode(deltaMarginData)
}

func itemListHandler(w http.ResponseWriter, r *http.Request) {
	// Your code here
	// itemListHandler should return the item list data in JSON format List of all the items sold with prices and total volume sold
	itemListData := map[string]map[string]float64{
		"Pizza": {
			"Price":       10.99,
			"Volume Sold": 200,
		},
		"Burger": {
			"Price":       8.99,
			"Volume Sold": 150,
		},
		"Salad": {
			"Price":       7.99,
			"Volume Sold": 100,
		},
	}

	json.NewEncoder(w).Encode(itemListData)
}

func predictedPriceHandler(w http.ResponseWriter, r *http.Request) {
	// Your code here
	// predictedPriceHandler should return the predicted price data in JSON format Predicted price of item selected
	itemID := r.URL.Query().Get("itemID")

	predictedPriceData := map[string]float64{
		"Predicted Price": 0, // This is a placeholder. Replace with your price prediction logic.
	}
	itemListData := map[string]map[string]float64{
		"Pizza": {
			"Price":       10.99,
			"Volume Sold": 200,
		},
		"Burger": {
			"Price":       8.99,
			"Volume Sold": 150,
		},
		"Salad": {
			"Price":       7.99,
			"Volume Sold": 100,
		},
	}
	if val, ok := itemListData[itemID]; ok {
		predictedPriceData["Predicted Price"] = val["Price"] // Replace with your price prediction logic.
	}

	json.NewEncoder(w).Encode(predictedPriceData)
}

func predictedRevenueHandler(w http.ResponseWriter, r *http.Request) {
	// Your code here
	// predictedRevenueHandler should return the predicted revenue data in JSON format Predicted revenue based on updated prices
	predictedRevenueData := map[string]float64{
		"Predicted Revenue": 0, // This is a placeholder. Replace with your revenue prediction logic.
	}
	itemListData := map[string]map[string]float64{
		"Pizza": {
			"Price":       10.99,
			"Volume Sold": 200,
		},
		"Burger": {
			"Price":       8.99,
			"Volume Sold": 150,
		},
		"Salad": {
			"Price":       7.99,
			"Volume Sold": 100,
		},
	}
	for _, itemData := range itemListData {
		predictedRevenueData["Predicted Revenue"] += itemData["Price"] * itemData["Volume Sold"] // Replace with your revenue prediction logic.
	}

	json.NewEncoder(w).Encode(predictedRevenueData)
}

func seasonalItemsHandler(w http.ResponseWriter, r *http.Request) {
	// Your code here
	// seasonalItemsHandler should return the seasonal items data in JSON format Seasonal Optimized Items Item list - Saag and Roti Predicted prices Expected Sales
	seasonalItemsData := map[string]map[string]float64{
		"Saag": {
			"Predicted Price": 5.99,
			"Expected Sales":  150,
		},
		"Roti": {
			"Predicted Price": 2.99,
			"Expected Sales":  200,
		},
	}

	json.NewEncoder(w).Encode(seasonalItemsData)
}

/*
Deployment instructions:
in ReadMe
(*/
