// signInStyles.js

const signInStyles = {
  container: {
    minHeight: '100vh',
    display: 'flex', // Use flexbox to align items
  },
  imageContainer: {
    backgroundImage: 'url("/signIn.png")',
    backgroundSize: 'cover', // Change to cover to ensure full coverage
    backgroundPosition: 'center',
    minHeight: {xs:'50vh',md:'100vh'},
    width: '100%', // Adjust the width to 50% for left side
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Centers items vertically
    alignItems: {xs:"basline",md:'basline'}, // Centers items horizontally
    padding: 4,
    width:{xs:"100%", md:'80%'}, // Adjust the width to 50% for right side
  },
  title: {
    color: '#0063B2',
    fontFamily: "'kanit'",
    fontSize: { xs: '40px', md: '64px' },
    fontWeight: 300,
  },
  title2: {
    color: '#0063B2',
    fontFamily: "'kanit'",
    fontSize: { xs: '40px', md: '64px' },
    fontWeight: 500,
  },
  form: {
    width: '100%',
    maxWidth: {xs:"100%",md:'80%'},
    alignItems:'baseline',
    mt: 3,
  },
  checkboxContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    mt: 2,
  },
  linkText: {
    mt: 2,
    color: 'black',
    fontFamily: 'kanit',
    textAlign: 'center',
  },
  signUpLink: {
    color: '#FFD700',
    cursor: 'pointer',
  },
};

export default signInStyles;
