const ShowText = (props) => {
    return (
        <>
            <div class="container col-md-12">
                <embed src={props.notaryFileData} style={{ height: '80vh', width: '70vw' }} />
            </div>
        </>
    );
};

export default ShowText;