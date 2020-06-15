

const dateFunction = (str) => {
    if(str !== null){
        const ymd = str.split('T')[0]
    const arr = ymd.split('-')
    return arr[1] + "-" + arr[2] + "-" + arr[0]
    }
    else {
        return "Not Available"
    }
    
}

export default dateFunction

// "2019-06-01T00:00:00Z"
