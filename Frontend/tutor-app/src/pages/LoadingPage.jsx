import { Blocks } from 'react-loader-spinner';

function LoadingPage() {

    return (
        <>
            <div style={{ position:"fixed", alignContent: "center", height: "100vh", width: "100vw", backgroundColor: '#16171d' }}>
                <Blocks
                    height="18%"
                    width="18%"
                    color="#4fa94d"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    visible={true}
                />
            </div>
        </>
    );
}

export default LoadingPage