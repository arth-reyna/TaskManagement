
const Image = ({ src, alt, className, style, ...other }) => {
  return (
    <img src={src} alt={alt} className={className} style={style} {...other} />
  )
}

export default Image