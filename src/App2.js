import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Header, Container, Form, Input, TextArea, Button, Select } from 'semantic-ui-react';
const genderOptions = [
	{ key: 'm', text: 'Male', value: 'male' },
	{ key: 'f', text: 'Female', value: 'female' },
	{ key: 'o', text: 'Other', value: 'other' },
];
class App2 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page1: true,
			page2: false,
			page3: false,
			firstName: '',
			lastName: '',
			email: '',
			errorstate: '',
			adminEmailsCount: [1],
		};
	}

	GoToFirstPage = () => {
		this.setState({
			page1: true,
			page2: false,
			page3: false,
		});
	};

	GoToSecondPage = () => {
		if (!this.state.firstName && !this.state.lastName && !this.state.email) {
			this.setState({
				errorstate: 'all',
			});
		} else if (!this.state.firstName && this.state.lastName && this.state.email) {
			this.setState({
				errorstate: 'firstname',
			});
		} else if (this.state.firstName && !this.state.lastName && this.state.email) {
			this.setState({
				errorstate: 'lastname',
			});
		} else if (this.state.firstName && this.state.lastName && !this.state.email) {
			this.setState({
				errorstate: 'email',
			});
		} else if (this.state.firstName && this.state.lastName && this.state.email) {
			this.setState({
				page1: false,
				page2: true,
				page3: false,
				errorstate: '',
			});
			console.log(this.state);
		}
	};

	GoToThirdPage = () => {
		this.setState({
			page1: false,
			page2: false,
			page3: true,
		});
	};

	handleTextEntry = name => event => {
		this.setState({
			[name]: event.target.value,
		});
		console.log(event.target.value);
	};

	AddAdminEmails = () => {
		this.setState(prevState => ({
			adminEmailsCount: prevState.adminEmailsCount.concat('1'),
		}));
	};

	SubmitData = () => {
		console.log('done');
	};

	render() {
		const { page1, page2, page3, errorstate, firstName, lastName, email, adminEmailsCount } = this.state;

		if (page1) {
			return (
				<Container text>
					<Header style={{ marginTop: '30px' }} as="h2" paddngTop="3" textAlign="center">
						Hi There.
					</Header>
					<Form>
						<Form.Group widths="equal">
							<Form.Field
								id="form-input-control-first-name"
								control={Input}
								label="First name"
								placeholder="First name"
								value={firstName}
								onChange={this.handleTextEntry('firstName')}
								error={
									errorstate == 'firstname' || errorstate == 'all'
										? `Please enter your First Name`
										: null
								}
							/>
							<Form.Field
								id="form-input-control-last-name"
								control={Input}
								label="Last name"
								placeholder="Last name"
								value={lastName}
								onChange={this.handleTextEntry('lastName')}
								error={
									errorstate == 'lastname' || errorstate == 'all'
										? `Please enter your Last Name`
										: null
								}
							/>
						</Form.Group>
						<Form.Field
							id="form-input-control-error-email"
							control={Input}
							label="Email"
							placeholder="joe@schmoe.com"
							value={email}
							onChange={this.handleTextEntry('email')}
							error={
								errorstate == 'email' || errorstate == 'all'
									? `Please enter a valid email address`
									: null
							}
						/>
						<Button
							onClick={this.GoToSecondPage}
							style={{ marginTop: '40px', backgroundColor: '#8A2BE2', color: '#fff' }}
							fluid
						>
							Proceed
						</Button>
					</Form>
				</Container>
			);
		} else if (page2) {
			return (
				<Container text>
					<Header style={{ marginTop: '30px' }} as="h2" paddngTop="3" textAlign="center">
						Hi {firstName}.
					</Header>
					<Header style={{ marginTop: '30px' }} as="h4" textAlign="center">
						<p>What are your main goals with slayte?</p>
					</Header>

					<Form>
						<Form.Group widths="equal">
							<label>1</label>
							<Form.Field id="form-input-control-first-name" control={Input} />
						</Form.Group>
						<Form.Group widths="equal">
							<label>2</label>
							<Form.Field id="form-input-control-first-name" control={Input} />
						</Form.Group>
						<Form.Group widths="equal">
							<label>3</label>
							<Form.Field id="form-input-control-first-name" control={Input} />
						</Form.Group>
						<Form.Group widths="equal">
							<Button
								onClick={this.GoToFirstPage}
								style={{ marginTop: '40px', backgroundColor: '#D8BFD8', color: '#fff' }}
								fluid
							>
								Back
							</Button>
							<Button
								onClick={this.GoToThirdPage}
								style={{ marginTop: '40px', backgroundColor: '#8A2BE2', color: '#fff' }}
								fluid
							>
								Proceed
							</Button>
						</Form.Group>
					</Form>
				</Container>
			);
		} else if (page3) {
			return (
				<Container text>
					<Header style={{ marginTop: '30px' }} as="h2" paddngTop="3" textAlign="center">
						Way to go!
					</Header>
					<Header style={{ marginTop: '30px' }} as="h4" textAlign="center">
						<p>Let us know who should be admins in your setup, and then you're on your way.</p>
					</Header>

					<Form>
						{adminEmailsCount.map((data, index) => (
							<Form.Group widths="equal">
								<Form.Field id={data} placeholder="Type Email" control={Input} />
								<button
									onClick={() => console.log(index)}
									style={{ backgroundColor: '#8A2BE2', color: '#fff', textAlign: 'center' }}
									class="ui circular icon button"
								>
									<i class="minus icon"></i>
								</button>
							</Form.Group>
						))}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 

						<div style={{ textAlign: 'center' }}>
							<button
								onClick={this.AddAdminEmails}
								style={{ backgroundColor: '#8A2BE2', color: '#fff', textAlign: 'center' }}
								class="ui circular icon button"
							>
								<i class="plus icon"></i>
							</button>
						</div>

						<Form.Group widths="equal">
							<Button
								onClick={this.GoToSecondPage}
								style={{ marginTop: '40px', backgroundColor: '#D8BFD8', color: '#fff' }}
								fluid
							>
								Back
							</Button>
							<Button
								onClick={this.SubmitData}
								style={{ marginTop: '40px', backgroundColor: '#3CB371', color: '#fff' }}
								fluid
							>
								Finish
							</Button>
						</Form.Group>
					</Form>
				</Container>
			);
		}
	}
}

export default App2;
