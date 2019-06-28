if(process.env.NODE_ENV === 'production') {
    export default './key_prod';
} else {
    export default './keys_dev';
}