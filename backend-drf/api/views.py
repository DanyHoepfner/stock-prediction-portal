from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import StockPredictionSerializer
from rest_framework.response import Response
from rest_framework import status
import yfinance as yf
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime
import os
from django.conf import settings
from .utils import save_plot
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model


class StockPredictionAPIView(APIView):
    def post(self, request):
        serializer = StockPredictionSerializer(data=request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data['ticker']

            # Fetch Data from yFinance
            now = datetime.now()
            start = datetime(now.year-10, now.month, now.day)
            end = now
            df = yf.download(ticker, start, end)
            if df.empty:
                return Response({'error': 'No data found for given ticker',
                                 'status': status.HTTP_404_NOT_FOUND}) 
            
            df = df.reset_index()

            # Generate basic Plot
            plt.switch_backend("AGG")
            plt.figure(figsize=(12,5))
            plt.plot(df.Close, label='Closing Price')
            plt.title(f'Closing Price of {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Close price')
            plt.legend()
            plot_img_path = f'{ticker}_plot.png'
            plot_img = save_plot(plot_img_path)

            # 100 Days Moving Average Plot
            ma100 = df.Close.rolling(100).mean()
            plt.switch_backend("AGG")
            plt.figure(figsize=(12,5))
            plt.plot(df.Close, label='Closing Price')
            plt.plot(ma100, label='100 Day Moving Average')
            plt.title(f'100 Day Moving AVG of {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Close price')
            plt.legend()
            plot_img_path = f'{ticker}_ma100_plot.png'
            ma100_plot_img = save_plot(plot_img_path)

            # 200 Days Moving Average Plot
            ma200 = df.Close.rolling(200).mean()
            plt.switch_backend("AGG")
            plt.figure(figsize=(12,5))
            plt.plot(df.Close, label='Closing Price')
            plt.plot(ma100, label='100 Day Moving Average')
            plt.plot(ma200, label='200 Day Moving Average')
            plt.title(f'200 Day Moving AVG of {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Close price')
            plt.legend()
            plot_img_path = f'{ticker}_ma200_plot.png'
            ma200_plot_img = save_plot(plot_img_path)


            # Splitting Data into training and testing data 70% and 30%
            data_training = pd.DataFrame(df.Close[0:int(len(df)*0.7)])
            data_testing = pd.DataFrame(df.Close[int(len(df)*0.7): -1])

            scaler = MinMaxScaler(feature_range=(0, 1))

            # Load ML Model
            model = load_model('stock_prediction_model.keras')

            # Preparing Test Data
            past_100_days = data_training.tail(100)
            final_df = pd.concat([past_100_days, data_testing], ignore_index=True )
            input_data = scaler.fit_transform(final_df)

            x_test = []
            y_test = []
            for i in range(100, input_data.shape[0]):
               x_test.append(input_data[i-100:i])
               y_test.append(input_data[i,0])

            x_test = np.array(x_test)
            y_test = np.array(y_test)

            y_predicted = model.predict(x_test)
            # Revert the scaled prices to original prices 
            y_predicted = scaler.inverse_transform(y_predicted.reshape(-1, 1)).flatten()
            y_test = scaler.inverse_transform(y_test.reshape(-1, 1)).flatten()  
            print(y_predicted)

            #Plot the final prediction
           
            plt.switch_backend("AGG")
            plt.figure(figsize=(12,5))
            plt.plot(y_test, label='Original Price')
            plt.plot(y_predicted, label='Predictedf Price')
            plt.title(f'Final Prediction for {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Close price')
            plt.legend()
            plot_img_path = f'{ticker}_final_prediction.png'
            plot_prediction = save_plot(plot_img_path)
            #Model Evalutaion

             

            


            return Response({'status': 'Success',
                              'plot_img': plot_img,
                              'ma100_plot_img': ma100_plot_img,
                              'ma200_plot_img': ma200_plot_img,
                              'plot_prediction': plot_prediction})