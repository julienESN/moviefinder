import SignUpPage from './SignUpPage/SignUpPage';

export default function Home() {
  return (
    <div>
      <SignUpPage handleGithubSignIn={() => {}} handleGoogleSignIn={() => {}} />
    </div>
  );
}
