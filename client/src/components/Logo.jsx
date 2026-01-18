import logo from '../assets/logo.png'

function Logo({ width = '100px' }) {
  return (
    <div>
      <img src={logo} style={{ width }} alt="Aaj Logo" className='rounded-lg' />
    </div>
  )
}

export default Logo