import React from 'react';
import { BallBeat } from 'react-pure-loaders';
import "./LoadingPage.scss";

let LoadingPage = (props) => {
    const { isLoading } = props
    return (
        <div> {isLoading && <div className="loadingPage" >
            <div className="loadBall" >
                <BallBeat
                    loading={isLoading}
                    color={'#123abc'}
                />
            </div>
        </div>
        }
        </div>
    )
}

export default LoadingPage;