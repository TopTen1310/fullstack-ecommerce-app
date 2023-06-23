import ReactLoading from 'react-loading';

export default function Loader({ customCss }) {
    return (
        <div className={`${customCss && customCss} flex justify-center mt-10`}>
            <ReactLoading type={'spinningBubbles'} color={'#04cc5d'} height={30} width={40} />
        </div>
    )
}