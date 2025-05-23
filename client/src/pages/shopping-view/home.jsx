import {Button} from '@/components/ui/button';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Smartphone,
  Shield,
  Cable,
} from 'lucide-react';
import {Card, CardContent} from '@/components/ui/card';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from '@/store/shop/products-slice';
import ShoppingProductTile from '@/components/shopping-view/product-tile';
import {useNavigate} from 'react-router-dom';
import {addToCart, fetchCartItems} from '@/store/shop/cart-slice';
import {useToast} from '@/components/ui/use-toast';
import ProductDetailsDialog from '@/components/shopping-view/product-details';
import {getFeatureImages} from '@/store/common-slice';

const categoriesWithIcon = [
  {id: 'cases', label: 'Cases', icon: Smartphone},
  {id: 'temperedGlass', label: 'Tempered Glass', icon: Shield},
  {id: 'accessories', label: 'Accessories', icon: Cable},
];

const brandsWithIcon = [
  {
    id: 'apple',
    label: 'Apple',
    icon: 'https://res.cloudinary.com/dpfqoeiig/image/upload/c_thumb,w_200,g_face/v1741274275/kxbn0je3kuop65t9olsa.png',
  },
  {
    id: 'samsung',
    label: 'Samsung',
    icon: 'https://res.cloudinary.com/dpfqoeiig/image/upload/c_thumb,w_200,g_face/v1741274294/elybk7nvagczuqpqcqyy.png',
  },
  {
    id: 'google',
    label: 'Google',
    icon: 'https://res.cloudinary.com/dpfqoeiig/image/upload/c_thumb,w_200,g_face/v1741274303/ea2vukwfsdcay7sbvr8g.png',
  },
  {
    id: 'moto',
    label: 'Motorola',
    icon: 'https://res.cloudinary.com/dpfqoeiig/image/upload/c_thumb,w_200,g_face/v1741274314/mphz8wqpc8cumjrwopez.png',
  },
  {
    id: 'oppo',
    label: 'Oppo',
    icon: 'https://res.cloudinary.com/dpfqoeiig/image/upload/c_thumb,w_200,g_face/v1741274339/apnunvihlgnhpq4f1geg.png',
  },
  {
    id: 'huawei',
    label: 'Huawei',
    icon: 'https://res.cloudinary.com/dpfqoeiig/image/upload/c_thumb,w_200,g_face/v1741274327/fmeynyql6dwybqcayma3.png',
  },
];
function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const {productList, productDetails} = useSelector(
    (state) => state.shopProducts
  );
  const {featureImageList} = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const {user} = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {toast} = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem('filters');
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem('filters', JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    if (!user?.id) {
      return toast({
        title: 'Please login to add product to cart',
        variant: 'destructive',
      });
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: 'Product is added to cart',
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: 'price-lowtohigh',
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                } absolute top-0 left-0 w-full h-full object-fill transition-opacity duration-1000`}
              />
            ))
          : null}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, 'category')
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
                key={categoryItem.label}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, 'brand')}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                key={brandItem.label}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <img
                    src={brandItem.icon}
                    className="w-full h-24 object-contain"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Available Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                    key={productItem._id}
                  />
                ))
              : null}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Our Services
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We’re offering a huge variety of mobile accessories like
            <span className="font-semibold text-gray-900">
              {' '}
              cases, tempered glass, chargers, cables, power banks,{' '}
            </span>
            and much more.
            <br />
            <br />
            We also offer **same-day repair services** for
            <span className="font-semibold text-gray-900">
              {' '}
              iPhone, iPad, Android phones, Tablets, Laptops,{' '}
            </span>
            & PlayStations.
            <br />
            <br />
            We specialize in bringing your devices back to life. Whether it’s a
            **cracked screen, battery issues, water damage,** or **software
            glitches**, we’ve got you covered.
          </p>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
