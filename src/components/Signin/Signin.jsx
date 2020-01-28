import React from 'react';
import FormInput from '../form-input/forum-input'
import CustomButton from '../custom-button/custom-button'
import './Signin.styles.scss'
class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }
    handleSubmit = event => {
        event.preventDefault()
        this.setState({email: '', password: ''})
    }
    handleChange = event => {
        const { value, name} = event.target
        this.setState({ [name]: value })
    }

    render() {
        return(
            <div style={{width: '30vw'}} className='sign-in'>
                <h2 className="title">I already have an account</h2>
                <span>Sign In with your email and password</span>
                
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                    name="email" 
                    type="email" 
                    value={this.state.email} 
                    handleChange={this.handleChange}
                    label="Email"
                    required 
                    />
                    <FormInput 
                    name="password" 
                    type="text" 
                    value={this.state.password} 
                    handleChange={this.handleChange}
                    label="Password"
                    required 
                    />
                    <CustomButton type="submit">Sign in</CustomButton>
                </form>

            </div>

        )
    }
}

export default SignIn