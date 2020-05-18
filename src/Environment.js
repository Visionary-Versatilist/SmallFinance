// export const ImageBaseUrl = "https://lendstack.app/";
export const ImageBaseUrl = "http://167.71.234.126/";
export const BaseUrl = ImageBaseUrl + "fintech/v1/api";
export const headers = {
    'Authorization': 'Bearer '+ localStorage.getItem('token')
  }

export const currencyFormat = 'en-IN'

// http://52.172.186.62/