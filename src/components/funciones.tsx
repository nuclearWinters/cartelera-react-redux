import decode from 'jwt-decode';

export default class AuthHelperMethods {
    
    // Initializing important variables

    //login = (Usuario: string, Contraseña: string) => {
    //    // Get a token from api server using the fetch api
    //    return this.fetch(`http://localhost:3001/sing-in`, {
    //        userInput: {
    //            Usuario,
    //            Contraseña
    //        }
    //    }).then(res => {
    //        this.setToken(res) // Setting the token in localStorage
    //        return Promise.resolve(res);
    //    })
    //}

    loggedIn = () => {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // Getting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired = (token: any) => {
        try {
            const decoded: any = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired.
                return true;
            }
            else
                return false;
        }
        catch (err) {
            console.log("expired check failed! Line 42: AuthService.js");
            return false;
        }
    }

    setToken = (idToken: string) => {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    getToken = () => {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout = () => {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }

    getConfirm = () => {
        let token = this.getToken()
        let answer: any;
        // Using jwt-decode npm package to decode the 
        if (token) answer = decode(token);
        console.log("Recieved answer!");
        return answer;
    }

    //fetch = (url: string, options: any) => {
    //    // performs api calls sending the required authentication headers
    //    const headers: any = {
    //        'Accept': 'application/json',
    //        'Content-Type': 'application/json'
    //    }
    //    // Setting Authorization header
    //    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    //    if (this.loggedIn()) {
    //        headers['Authorization'] = 'Bearer ' + this.getToken()
    //    }
//
    //    return axios.post(url, {
    //        headers,
    //        ...options
    //    })
    //    .then(this._checkStatus)
    //    .then(response => response.data)
    //}

    _checkStatus = (response: any) => {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error: any = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}