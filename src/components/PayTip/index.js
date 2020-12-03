import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

class PayTip extends Component {
    static propTypes = {
        onCloseModal: PropTypes.func,
    };

    static defaultProps = {
        onCloseModal: a => a,
    };

    handleCloseModal = (e) => {
        e.preventDefault();
        const { onCloseModal } = this.props;
        onCloseModal && onCloseModal();
    }

    render() {
        return (
            <div className="pay-tip">
                <div className="title">充值，在新打开的窗口中完成充值！</div>
                <div className="content">
                    支付完成前，请不要关闭此支付验证窗口。 <br />支付完成后，请根据您支付的情况点击下面的按钮。
                </div>
                <div className="right-btn close" onClick={e => this.handleCloseModal(e)}></div>
                <div className="bottom-btn">
                    <button type='button' className="btn success" onClick={e => this.handleCloseModal(e)}>支付成功</button>
                    <button type='button' className="btn" onClick={e => this.handleCloseModal(e)}>支付遇到问题</button>
                </div>
            </div>
        )
    }
}

export default PayTip;