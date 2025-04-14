let socket=io();
    let username=window.prompt('Enter your name :');
    console.log(username);
    socket.emit('join',username);
    socket.on('listUsers',(message)=>{
        console.log(message);
    })
    let input=document.getElementById('input')
    let form=document.getElementById('form');
    let chat=document.getElementById('chat');
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        message=input.value;
        let p=document.createElement('p');
        p.innerText=message;
        p.className='user-message'
        chat.appendChild(p);
        input.value='';
        if(message){
            socket.emit('message',message);
            message='';
        }
    })
    socket.on('message',(message)=>{
        let p=document.createElement('p');
        p.innerText=message.message;
        p.className='other-message'
        chat.appendChild(p);
    })
    socket.on('userJoin',(message)=>{
        let p=document.createElement('p');
        p.innerText=message;
        p.className='system-message'
        chat.appendChild(p);
    })
    socket.on('userLeft',(message)=>{
        let p=document.createElement('p');
        p.innerText=message
        p.className='system-message'
        chat.appendChild(p);
    })
    socket.on('userList',(message)=>{
        let userListDiv = document.getElementById('user-list');
        userListDiv.innerText=message;
        chat.appendChild(p);
    })