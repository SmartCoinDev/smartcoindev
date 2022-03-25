import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View, Alert} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Home from './panels/Home';
import bridge from '@vkontakte/vk-bridge'
import axios from 'axios'

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			fetchedUser: null,
			popout: null,
            userAcc: null,
            balance: 0
		};
		this.closePopout = this.closePopout.bind(this);
	}

    go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
        if(e.currentTarget.dataset.to === "top") {
            this.getUsersTop();
            this.getGroupsTop();
        }
	}

    componentDidMount() {
        bridge.send('VKWebAppInit');
        bridge.subscribe(e => console.log(e))
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
                    this.setState({ fetchedUser: e.detail.data });
                    this.createUser(e.detail.data.id)
                    console.log(e.detail.data)
					break;
					case 'VKWebAppShowWallPostBoxResult':

  					break;
				default:
					console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
        // console.log(window.location)
	}

	openDefault(title, msg, actions) {
        this.setState({
            popout:
                <Alert
                    actions={[actions]}
                    onClose={this.closePopout}
                >   
                    <h2>{title}</h2>
                    <p>{msg}</p>
                </Alert>
        });
    }

    closePopout() {
        this.setState({ popout: null });
    }

    createUser = async(id) => {
        let result = await axios.get(`http://localhost:3000/createUser?user_id=${id}`);
        console.log(result.data.user)
        this.setState({balance: result.data.user.balance})
    }

    updateUserBalance = async(id) => {
        let result = await axios.get(`http://localhost:3000/updateUserBalance?user_id=${id}`);
        this.setState({userAcc: result.data.user})
        this.setState({balance: result.data.user.balance+1})
    }

    add1 = () => {
        this.updateUserBalance(this.state.fetchedUser.id)
	}
	
    render() {
		return (
			<View popout={this.state.popout} activePanel={this.state.activePanel}>
                <Home id="home" fetchedUser={this.state.fetchedUser} go={this.go} balance={this.state.balance} add1={this.add1} />
			</View>
		);
	}

}

export default App;
