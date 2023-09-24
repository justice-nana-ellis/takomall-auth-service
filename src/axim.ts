import axios from 'axios';

const body = {
  "email": "justicemnmn@gmail.com",
		"password": "Hoxina1",
		"full_name": "justice Dockle"
};

async function makePostRequest() {
  const response = await axios.post('https://takomall-app.onrender.com/auth/signup', body);
  //console.log(response.data);
}

makePostRequest();
