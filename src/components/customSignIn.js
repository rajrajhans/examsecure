
// trying to make custom sign in box and hooking that up with Amplify

import React from "react";
import { AmplifySignIn } from "@aws-amplify/ui-react";

export class CustomSignIn extends AmplifySignIn {
    constructor(props) {
        super(props);
        this._validAuthStates = ["signIn", "signedOut", "signedUp"];
    }

    showComponent(theme) {
        return (
            <div className="mx-auto w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label
                            className="block text-grey-darker text-sm font-bold mb-2"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            key="username"
                            name="username"
                            onChange={this.handleInputChange}
                            type="text"
                            placeholder="Username"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-grey-darker text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            key="password"
                            name="password"
                            onChange={this.handleInputChange}
                            type="password"
                            placeholder="******************"
                        />
                        <p className="text-grey-dark text-xs">
                            Forgot your password?{" "}
                            <a
                                className="text-indigo cursor-pointer hover:text-indigo-darker"
                                onClick={() => super.changeState("forgotPassword")}
                            >
                                Reset Password
                            </a>
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => super.signIn()}
                        >
                            Login
                        </button>
                        <p className="text-grey-dark text-xs">
                            No Account?{" "}
                            <a
                                className="text-indigo cursor-pointer hover:text-indigo-darker"
                                onClick={() => super.changeState("signUp")}
                            >
                                Create account
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        );
    }
}