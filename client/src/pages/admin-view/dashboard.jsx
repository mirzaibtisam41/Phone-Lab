import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, deleteFeatureImage, getFeatureImages } from "@/store/common-slice";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  function handleDeleteFeatureImage(imageId) {
    dispatch(deleteFeatureImage(imageId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      // isEditMode={currentEditedId !== null}
      />
      <Button disabled={!uploadedImageUrl} onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem, index) => (
            <div key={index} className="relative group rounded-lg overflow-hidden shadow-lg">
              {/* Image */}
              <img
                src={featureImgItem.image}
                className="w-full h-[300px] object-fill rounded-lg"
              />

              {/* Delete Button */}
              <button
                onClick={() => handleDeleteFeatureImage(featureImgItem._id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))
          : null}
      </div>
    </div>
  );
}

export default AdminDashboard;
