import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Div } from '@vkontakte/vkui';
import './assets/css/background.css'
import './assets/css/bootstrap.css';
import './assets/css/style.css';
import '@vkontakte/vkui/dist/vkui.css';	


const Home = ({ id, go, fetchedUser, balance, add1 }) => (
	<Panel id={id}>
		<Div>
			<div className="row">
				<div className="col-md-12">
					<div className="text-center text-muted">
						<center><h1 style={{ color: "gray-dark" }}>{balance} SC</h1></center>
					</div>
                <div className="container">

                    <Div align="center" style={{ height: "315px"}}>
                        <img className="clicked" src={require('./click.png')} onClick={add1} width={250} height={250} alt="gege" />
                    </Div>
                    
				</div>
				</div>
			</div>
		</Div>
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	share: PropTypes.func,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
