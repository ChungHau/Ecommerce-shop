/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../../../server";
import { useActivateAccount } from "../../../libs/auth";

const Activation = () => {
  const { activation_token } = useParams();

  const {mutate ,error} = useActivateAccount();

  useEffect(() => {
    console.log('useEffect');
    
    if (activation_token) {
    mutate(activation_token)
    }
  }, [mutate, activation_token]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been created successfully!</p>
      )}
    </div>
  );
};

export default Activation;
