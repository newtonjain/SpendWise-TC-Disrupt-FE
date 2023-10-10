# Go Price Predictor Application

This is a basic Go application for predicting prices.

## Getting Started
To run the project locally, follow these steps:

1. **Install Go**: If you haven't already, download and install Go from the official website.

2. **Clone the repository**: Clone the repository to your local machine using the command `git clone https://github.com/yourusername/SpendWise-TC-Disrupt-FE.git`.

3. **Navigate to the backend directory**: Use the command `cd SpendWise-TC-Disrupt-FE/backend` to navigate to the backend directory.

4. **Download dependencies**: Run the command `go mod download` to download the necessary dependencies.For example, `go get -v -u github.com/gorilla/mux`

5. **Run the application**: Finally, run the application using the command `go run pricepredictor.go`. The application should now be running on `localhost:8080`.

To deploy the project to GCP, follow these steps:
1. **Create a Go project**: Start by creating a new directory for your project and initializing it as a Go module. Then, create a `main.go` file with the basic structure of your application.

2. **Google Cloud Deployment**: You can deploy your Go application to Google Cloud using Google Cloud Run or Google App Engine.

   - **Google Cloud Run**: Create a Dockerfile for your application, build a Docker image, and then deploy that image to Cloud Run. Here is a basic Dockerfile for a Go application:



```Dockerfile
FROM golang:1.16-alpine as builder
WORKDIR /app
COPY . .
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

FROM alpine:latest  
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /SpendWise-TC-Disrupt-FE/backend .
CMD ["./main"]
```

   - **Google App Engine**: Create an `app.yaml` file for your application and then deploy your application using the `gcloud` command-line tool. Here is a basic `app.yaml` file for a Go application:

```yaml
runtime: go113
```

Then, you can deploy your application using the following command:

```bash
gcloud app deploy
```

Please note that you need to have the Google Cloud SDK installed and configured on your machine to deploy your application to Google Cloud. Also, you need to have a Google Cloud project and enable the necessary APIs (Cloud Run API for Cloud Run and App Engine Admin API for App Engine).

Remember, this is a very basic guide and doesn't include any error handling, data validation, or actual logic for your application. You'll need to implement those parts yourself.

## Infrastructure Setup

1. **Google Cloud Project**: Ensure you have a Google Cloud project created. In this case, your project is named `CostCurve`.

2. **Google Cloud SDK**: Install and configure the Google Cloud SDK on your machine. This will allow you to interact with your Google Cloud resources from your local machine.

3. **Google Cloud SQL**: Create a Google Cloud SQL instance for your application. This will be used to store your application's data.

```bash
gcloud sql instances create my-instance --project=CostCurve
```

4. **Google Cloud Storage**: Create a Google Cloud Storage bucket for your application. This will be used to store your application's static files.

```bash
gsutil mb gs://my-bucket --project=CostCurve
```

5. **Google Cloud Run**: Deploy your application to Google Cloud Run. This will create a new service in Cloud Run that will host your application.

```bash
gcloud run deploy --image gcr.io/CostCurve/my-image --project=CostCurve
```

6. **Google Cloud Build**: Build your application's Docker image using Google Cloud Build. This will create a new Docker image that can be deployed to Cloud Run.

```bash
gcloud builds submit --tag gcr.io/CostCurve/my-image
```

7. **Google Cloud Firestore**: Create a Google Cloud Firestore database for your application. This will be used to store your application's data.

```bash
gcloud firestore databases create --project=CostCurve
```

8. **Google Cloud Pub/Sub**: Create a Google Cloud Pub/Sub topic for your application. This will be used for real-time messaging in your application.

```bash
gcloud pubsub topics create my-topic --project=CostCurve
```

9. **Google Cloud Functions**: Deploy a Google Cloud Function for your application. This will be used to handle background tasks in your application.

```bash
gcloud functions deploy my-function --runtime go113 --trigger-topic my-topic --project=CostCurve
```

10. **Google Cloud Scheduler**: Create a Google Cloud Scheduler job for your application. This will be used to schedule tasks in your application.

```bash
gcloud scheduler jobs create pubsub my-job --schedule "0 9 * * *" --topic my-topic --message-body "Hello, world!" --project=CostCurve
```

Remember, this is a very basic guide and doesn't include any error handling, data validation, or actual logic for your application. You'll need to implement those parts yourself.
