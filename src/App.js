import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {
	Header,
	Container,
	Form,
	Input,
	TextArea,
	Button,
	Image,
	List,
	Select,
	Dimmer,
	Loader,
	Segment,
} from 'semantic-ui-react';

function App() {
	const intialcount = [];
	const [page1, setPage1] = useState(true);
	const [page2, setPage2] = useState(false);
	const [page3, setPage3] = useState(false);
	const [page4, setPage4] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [errorstate, setErrorState] = useState('');
	const [adminArray, setAdminArray] = useState(intialcount);
	const [adminEmail, setAdminEmail] = useState('');
	const [reason1, setReason1] = useState('');
	const [reason2, setReason2] = useState('');
	const [reason3, setReason3] = useState('');
	const [loader, setLoader] = useState('');

	function GoToFirstPage() {
		setPage1(true);
		setPage2(false);
		setPage3(false);
	}

	function GoToSecondPage() {
		// RegEx from: https://stackoverflow.com/a/1373724
		const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

		if (!firstName || !lastName || !email) {
			setErrorState('All fields are required');
		} else {
			if (!email.match(pattern)) {
				setErrorState('Invalid Email');
			} else {
				setErrorState('');
				setPage1(false);
				setPage2(true);
				setPage3(false);
			}
		}
	}

	function GoToThirdPage() {
		if (reason1 && reason2 && reason3) {
			setErrorState('');
			setPage1(false);
			setPage2(false);
			setPage3(true);
		} else {
			setErrorState('All 3 Reasons are required');
		}
	}

	function handleFirstName(event) {
		event.preventDefault();
		setErrorState('');
		setFirstName(event.target.value);
	}

	function handleLastName(event) {
		event.preventDefault();
		setErrorState('');
		setLastName(event.target.value);
	}

	function handleEmail(event) {
		event.preventDefault();
		setErrorState('');
		setEmail(event.target.value);
	}

	function handleReason1(event) {
		setErrorState('');
		setReason1(event.target.value);
	}

	function handleReason2(event) {
		setErrorState('');
		setReason2(event.target.value);
	}

	function handleReason3(event) {
		setErrorState('');
		setReason3(event.target.value);
	}

	function handleAdminEmail(event) {
		setErrorState('');
		setAdminEmail(event.target.value);
	}

	function AddAdminEmails() {
		// RegEx from: https://stackoverflow.com/a/1373724
		const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		if (!adminEmail.match(pattern)) {
			setErrorState('Invalid Email');
		} else if (adminEmail.match(pattern)) {
			if (adminArray.includes(adminEmail)) {
				setErrorState('Email already added');
			} else {
				setErrorState('');
				setAdminArray(adminArray => adminArray.concat(adminEmail));
				setAdminEmail('');
			}
		}
	}

	function RemoveAdminEmails(data) {
		setAdminArray(adminArray.filter(item => item !== data));
	}

	async function SubmitData() {
		const response = await fetch(process.env.URI, {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({
				first_name: firstName,
				last_name: lastName,
				email: email,
				reason: [reason1, reason2, reason3],
				admin_emails: adminArray,
			}),
		});
		if (response.status == 200) {
			setPage4(true);
			setPage1(false);
			setPage2(false);
			setPage3(false);
		}
	}

	if (page1) {
		return (
			<Container text>
				<Segment style={{ margin: '50px' }}>
					<Header style={{ marginTop: '30px' }} as="h2" paddngTop="3" textAlign="center">
						Hi There.
						<br />
						<small style={{ color: 'red' }}>{errorstate}</small>
					</Header>

					<Form>
						<Form.Group widths="equal">
							<Form.Field
								id="form-input-control-first-name"
								control={Input}
								label="First name"
								placeholder="First name"
								value={firstName}
								onChange={event => handleFirstName(event)}
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
								onChange={event => handleLastName(event)}
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
							onChange={event => handleEmail(event)}
							error={
								errorstate == 'email' || errorstate == 'all'
									? `Please enter a valid email address`
									: null
							}
						/>
						<Button
							onClick={() => GoToSecondPage()}
							style={{ marginTop: '40px', backgroundColor: '#8A2BE2', color: '#fff' }}
							fluid
						>
							Proceed
						</Button>
					</Form>
				</Segment>
			</Container>
		);
	} else if (page2) {
		return (
			<Container text>
				<Segment style={{ margin: '50px' }}>
					<Header style={{ marginTop: '30px' }} as="h2" paddngTop="3" textAlign="center">
						Hi {firstName}.
					</Header>
					<Header style={{ marginTop: '30px' }} as="h4" textAlign="center">
						<p>What are your main goals with slayte?</p>
						<br />
						<p style={{ color: 'red' }}>{errorstate}</p>
					</Header>

					<Form>
						<Form.Group widths="equal">
							<label>1</label>
							<Form.Field
								value={reason1}
								onChange={event => handleReason1(event)}
								id="form-input-control-first-name"
								control={Input}
							/>
						</Form.Group>
						<Form.Group widths="equal">
							<label>2</label>
							<Form.Field
								value={reason2}
								onChange={event => handleReason2(event)}
								id="form-input-control-first-name"
								control={Input}
							/>
						</Form.Group>
						<Form.Group widths="equal">
							<label>3</label>
							<Form.Field
								value={reason3}
								onChange={event => handleReason3(event)}
								id="form-input-control-first-name"
								control={Input}
							/>
						</Form.Group>
						<Form.Group widths="equal">
							<Button
								onClick={() => GoToFirstPage()}
								style={{ marginTop: '40px', backgroundColor: '#D8BFD8', color: '#fff' }}
								fluid
							>
								Back
							</Button>
							<Button
								onClick={() => GoToThirdPage()}
								style={{ marginTop: '40px', backgroundColor: '#8A2BE2', color: '#fff' }}
								fluid
							>
								Proceed
							</Button>
						</Form.Group>
					</Form>
				</Segment>
			</Container>
		);
	} else if (page3) {
		return (
			<Container text>
				<Segment style={{ margin: '50px' }}>
					<Header style={{ marginTop: '30px' }} as="h2" paddngTop="3" textAlign="center">
						Way to go!
					</Header>
					<Header style={{ marginTop: '30px' }} as="h4" textAlign="center">
						<p>Let us know who should be admins in your setup, and then you're on your way.</p>
						<br />
						<p style={{ color: 'red' }}>{errorstate}</p>
					</Header>

					<Form>
						<Form.Group widths="equal">
							<Form.Field
								onChange={event => handleAdminEmail(event)}
								placeholder="Type Email"
								control={Input}
								value={adminEmail}
							/>
						</Form.Group>
						<div style={{ textAlign: 'center' }}>
							<button
								onClick={() => AddAdminEmails()}
								style={{ backgroundColor: '#8A2BE2', color: '#fff', textAlign: 'center' }}
								class="ui circular icon button"
							>
								<i class="plus icon"></i>
							</button>
						</div>

						<List divided verticalAlign="middle">
							{adminArray.map((data, i) => (
								<List.Item>
									<List.Content floated="right">
										<Button onClick={() => RemoveAdminEmails(data)}>Remove</Button>
									</List.Content>
									<Image avatar src="https://react.semantic-ui.com/images/avatar/small/lena.png" />
									<List.Content>{data}</List.Content>
								</List.Item>
							))}
						</List>

						<Form.Group widths="equal">
							<Button
								onClick={() => GoToSecondPage()}
								style={{ marginTop: '40px', backgroundColor: '#D8BFD8', color: '#fff' }}
								fluid
							>
								Back
							</Button>
							<Button
								onClick={() => SubmitData()}
								style={{ marginTop: '40px', backgroundColor: '#3CB371', color: '#fff' }}
								fluid
							>
								Finish
							</Button>
						</Form.Group>
					</Form>
				</Segment>
			</Container>
		);
	} else if (page4) {
		return (
			<Segment style={{ margin: '50px' }}>
				<Image src="/success.png" size="large" centered />
			</Segment>
		);
	}
}

export default App;
