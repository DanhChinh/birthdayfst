import { useState } from 'react';

const Share = () => {
    // const [show, setShow] = useState(false);


    return (
        <div className="share">

            <button className='btn' data-bs-toggle="modal" data-bs-target="#myModal">
                <img className='nav-icon' id="share-icon" src="assets/shared/img/arrow-right-arrow-left-solid.svg" />
            </button>

            <div className="modal fade" id="myModal" tabIndex="-1" aria-labelledby="myModalLabel" aria-hidden="false">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title" id="myModalLabel">Tiêu đề Modal</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
                        </div>

                        <div className="modal-body">
                            Đây là nội dung của modal.
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            <button type="button" className="btn btn-primary">Lưu</button>
                        </div>

                    </div>
                </div>
            </div>



        </div>
    );
};

export default Share;
