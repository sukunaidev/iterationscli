
export function RegisterHandler(){
  // do logic

  window.location.assign("/auth/sign-up")
  console.log("creating a login dialog");
}

export function LogoutHandler(){
  // do logic
  console.log("logging the user out");
}

export function LoginHandler(){
  // do logic
  window.location.assign("/auth/sign-in")
}

