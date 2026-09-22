function Message({message}) {
 
  return (
    
    <div id="message">{message && <div className="toast">{message} </div>}</div>
  );
}
export default Message;
