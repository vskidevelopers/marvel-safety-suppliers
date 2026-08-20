// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  updateDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Persistent local cache (IndexedDB) so repeat reads of the same products/quotes
// come back instantly instead of round-tripping to Firestore every time — falls
// back to the plain in-memory client on the server, since IndexedDB doesn't exist there.
export const db =
  typeof window !== "undefined"
    ? initializeFirestore(app, {
        localCache: persistentLocalCache({
          tabManager: persistentMultipleTabManager(),
        }),
      })
    : getFirestore(app);

// ////////////////////////////
//   Auth Related Functions //
// //////////////////////////

export const useAuthenticationFunctions = () => {
  const logout = async () => {
    await signOut(auth);
    localStorage.clear();
  };

  const login = async (email, password) => {
    console.log("logging in ... ");
    console.log("email >> ", email);
    console.log("password >> ", password);

    try {
      // Authenticate the user with the provided email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // Return a success message or code
      return {
        success: true,
        message: "Login successful",
        loggedInUser: userCredential.user,
      };
    } catch (error) {
      // Handle authentication errors
      console.error("Login failed", error);

      // Return an error message or code
      return {
        success: false,
        error: error.code,
        message: error.message,
        loggedInUser: null,
      };
    }
  };

  return {
    login,
    logout,
  };
};

// ///////////////////////////////
//   Product Related Functions //
// /////////////////////////////

// Shared field-fallback mapping so every product read (full list or featured) is consistent
function mapProductDoc(doc) {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name || "Unnamed Product",
    slug: data.slug || doc.id,
    sku: data.sku || "NO-SKU",
    price: data.price || 0,
    oldPrice: data.oldPrice,
    category: data.category || "Uncategorized",
    description: data.description || "",
    shortDescription: data.shortDescription || "",
    primaryImage: data.primaryImage || "/placeholder-product.svg",
    additionalImages: data.additionalImages || [],
    certifications: data.certifications || [],
    inStock: data.inStock || false,
    stockCount: data.stockCount || 0,
    status: data.status || "active",
    specs: data.specs || {},
    features: data.features || [],
    applications: data.applications || [],
    metaTitle: data.metaTitle,
    metaDescription: data.metaDescription,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

// ✅ Fetch all products
export async function fetchAllProducts() {
  try {
    const productsSnapshot = await getDocs(collection(db, "products"));
    const products = productsSnapshot.docs.map(mapProductDoc);
    return { success: true, data: products };
  } catch (error) {
    console.error("❌ [Firebase] fetchAllProducts error:", error);
    return { success: false, error: error.message };
  }
}

// ✅ Fetch a handful of in-stock products for homepage "Popular Safety Gear" —
// asks Firestore for just `count` docs instead of pulling the whole catalog
export async function fetchFeaturedProducts(count = 4) {
  try {
    const q = query(
      collection(db, "products"),
      where("inStock", "==", true),
      limit(count),
    );
    const snapshot = await getDocs(q);
    return { success: true, data: snapshot.docs.map(mapProductDoc) };
  } catch (error) {
    console.error("❌ [Firebase] fetchFeaturedProducts error:", error);
    return { success: false, error: error.message };
  }
}

// ✅ Fetch single product
export async function fetchProductById(id) {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
    }
    return { success: false, error: "Product not found" };
  } catch (error) {
    console.error("❌ [Firebase] fetchProductById error:", error);
    return { success: false, error: error.message };
  }
}

// ✅ Create new product
export async function createProduct(productData) {
  try {
    const docRef = doc(collection(db, "products"));
    await setDoc(docRef, {
      ...productData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { success: true, productId: docRef.id };
  } catch (error) {
    console.error("❌ [Firebase] createProduct error:", error);
    return { success: false, error: error.message };
  }
}

// ✅ Update existing product
export async function updateProduct(productId, productData) {
  try {
    const docRef = doc(db, "products", productId);
    await updateDoc(docRef, {
      ...productData,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error("❌ [Firebase] updateProduct error:", error);
    return { success: false, error: error.message };
  }
}

// ✅ Delete product
export async function deleteProduct(productId) {
  try {
    const docRef = doc(db, "products", productId);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error("❌ [Firebase] deleteProduct error:", error);
    return { success: false, error: error.message };
  }
}

// ✅ Fetch by category
export async function fetchProductsByCategory(category) {
  try {
    const q = query(
      collection(db, "products"),
      where("category", "==", category),
    );
    const snapshot = await getDocs(q);
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { success: true, data: products };
  } catch (error) {
    console.error("❌ [Firebase] fetchProductsByCategory error:", error);
    return { success: false, error: error.message };
  }
}

// ✅ Fetch by attribute (e.g., trending=true)
export async function fetchProductsByAttribute(attribute, value = true) {
  try {
    const q = query(collection(db, "products"), where(attribute, "==", value));
    const snapshot = await getDocs(q);
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { success: true, data: products };
  } catch (error) {
    console.error("❌ [Firebase] fetchProductsByAttribute error:", error);
    return { success: false, error: error.message };
  }
}

// ///////////////////////////
//   Order Related Functions //
// ///////////////////////////

// ✅ Add order to Firestore
// ✅ Add order to Firestore
export async function addOrderToFirestore(data) {
  console.log("📦 [Firebase] Adding order to Firestore...");
  console.log("📦 [Firebase] Order data:", JSON.stringify(data, null, 2));

  try {
    const cleanData = JSON.parse(JSON.stringify(data));
    const orderRef = doc(collection(db, "orders"));
    console.log("📦 [Firebase] Generated order ID:", orderRef.id);

    await setDoc(orderRef, {
      ...cleanData,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    console.log("✅ [Firebase] Order created successfully!");
    console.log("✅ [Firebase] Order ID:", orderRef.id);

    return { success: true, orderId: orderRef.id };
  } catch (error) {
    console.error("❌ [Firebase] Order creation FAILED:", error);
    console.error("❌ [Firebase] Error details:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    return { success: false, error: error.message };
  }
}

// ✅ Fetch order by ID - ensure complete data structure
export async function fetchOrderFromFirestore(orderId) {
  console.log("🔍 [Firebase] Fetching order by ID:", orderId);

  try {
    const orderDoc = await getDoc(doc(db, "orders", orderId));

    if (orderDoc.exists()) {
      const data = orderDoc.data();

      // ✅ Provide fallbacks for missing fields
      const completeOrder = {
        id: orderDoc.id,
        customer: {
          fullName: data.customer?.fullName || "Unknown Customer",
          phone: data.customer?.phone || "No Phone",
          location: data.customer?.location || "No Location",
          city: data.customer?.city || "No City",
        },
        payment: {
          method: data.payment?.method || "cod",
          mpesaCode: data.payment?.mpesaCode,
        },
        items: data.items || [],
        totals: {
          subtotal: data.totals?.subtotal || 0,
          vat: data.totals?.vat || 0,
          delivery: data.totals?.delivery || 0,
          grandTotal: data.totals?.grandTotal || 0,
        },
        status: data.status || "pending",
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };

      console.log("✅ [Firebase] Order found!");
      console.log(
        "✅ [Firebase] Order data:",
        JSON.stringify(completeOrder, null, 2),
      );

      return {
        success: true,
        data: completeOrder,
      };
    }

    console.warn("⚠️ [Firebase] Order not found for ID:", orderId);
    return { success: false, data: null };
  } catch (error) {
    console.error("❌ [Firebase] Order fetch FAILED:", error);
    console.error("❌ [Firebase] Error details:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    return { success: false, error: error.message };
  }
}
// ✅ Fetch all orders from Firestore
export async function fetchAllOrders() {
  try {
    const ordersQuery = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc"),
    );

    const ordersSnapshot = await getDocs(ordersQuery);
    const orders = ordersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { success: true, data: orders };
  } catch (error) {
    console.error("❌ [Firebase] fetchAllOrders error:", error);
    return { success: false, error: error.message };
  }
}

// ✅ Update order status
export async function updateOrderStatus(orderId, newStatus) {
  console.log("🔄 [Firebase] Updating order status...");
  console.log("🔄 [Firebase] Order ID:", orderId);
  console.log("🔄 [Firebase] New status:", newStatus);

  try {
    // Validate status values
    const validStatuses = [
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
    ];
    if (!validStatuses.includes(newStatus)) {
      throw new Error(
        `Invalid status: ${newStatus}. Valid statuses: ${validStatuses.join(", ")}`,
      );
    }

    const orderRef = doc(db, "orders", orderId);
    const orderDoc = await getDoc(orderRef);

    if (!orderDoc.exists()) {
      console.warn("⚠️ [Firebase] Order not found for ID:", orderId);
      return { success: false, error: "Order not found" };
    }

    // Update the status and updatedAt timestamp
    await updateDoc(orderRef, {
      status: newStatus,
      updatedAt: serverTimestamp(),
    });

    console.log("✅ [Firebase] Order status updated successfully!");
    console.log("✅ [Firebase] Order ID:", orderId, "Status:", newStatus);

    return { success: true };
  } catch (error) {
    console.error("❌ [Firebase] Order status update FAILED:", error);
    console.error("❌ [Firebase] Error details:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    return { success: false, error: error.message };
  }
}

/////////////////////////////////
//   Quote Related Functions ////
/////////////////////////////////

export async function submitQuoteToFirestore(quoteData) {
  console.log("📦 [Firebase] Submitting quote to Firestore...");
  console.log("📦 [Firebase] Quote data:", JSON.stringify(quoteData, null, 2));

  try {
    const quoteRef = doc(collection(db, "quotes"));
    console.log("📦 [Firebase] Generated quote ID:", quoteRef.id);

    await setDoc(quoteRef, {
      ...quoteData,
      status: "pending",
      submittedAt: serverTimestamp(),
    });

    console.log("✅ [Firebase] Quote created successfully!");
    return { success: true, quoteId: quoteRef.id };
  } catch (error) {
    console.error("❌ [Firebase] Quote submission FAILED:", error);
    console.error("❌ [Firebase] Error details:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    return { success: false, error: error.message };
  }
}

// ✅ Fetch all quotes - ensure complete data structure
export async function fetchAllQuotes() {
  try {
    const quotesQuery = query(
      collection(db, "quotes"),
      orderBy("submittedAt", "desc"),
    );

    const quotesSnapshot = await getDocs(quotesQuery);
    const quotes = quotesSnapshot.docs.map((doc) => {
      const data = doc.data();

      // ✅ Provide fallbacks for missing fields
      return {
        id: doc.id,
        companyName: data.companyName || "Unknown Company",
        contactPerson: data.contactPerson || "Unknown Contact",
        email: data.email || "no-email@example.com",
        phone: data.phone || "No Phone",
        location: data.location || "No Location",
        items: data.items || "No Items Specified",
        estimatedQuantity: data.estimatedQuantity,
        deliveryDate: data.deliveryDate,
        notes: data.notes,
        status: data.status || "pending",
        submittedAt: data.submittedAt,
      };
    });

    return { success: true, data: quotes };
  } catch (error) {
    console.error("❌ [Firebase] fetchAllQuotes error:", error);
    return { success: false, error: error.message };
  }
}

// ✅ Fetch single quote by ID
export async function fetchQuoteById(quoteId) {
  console.log("🔍 [Firebase] Fetching quote by ID:", quoteId);

  try {
    const quoteDoc = await getDoc(doc(db, "quotes", quoteId));

    if (quoteDoc.exists()) {
      console.log("✅ [Firebase] Quote found!");
      console.log(
        "✅ [Firebase] Quote data:",
        JSON.stringify(quoteDoc.data(), null, 2),
      );

      console.log("return data for quote >> ", {
        success: true,
        data: { id: quoteDoc.id, ...quoteDoc.data() },
      });

      return {
        success: true,
        data: { id: quoteDoc.id, ...quoteDoc.data() },
      };
    }

    console.warn("⚠️ [Firebase] Quote not found for ID:", quoteId);
    return { success: false, data: null };
  } catch (error) {
    console.error("❌ [Firebase] Quote fetch FAILED:", error);
    console.error("❌ [Firebase] Error details:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    return { success: false, error: error.message };
  }
}

// ✅ Update quote status
export async function updateQuoteStatus(quoteId, newStatus) {
  try {
    const validStatuses = [
      "pending",
      "contacted",
      "quoted",
      "converted",
      "archived",
    ];
    if (!validStatuses.includes(newStatus)) {
      throw new Error(`Invalid status: ${newStatus}`);
    }

    const quoteRef = doc(db, "quotes", quoteId);
    const quoteDoc = await getDoc(quoteRef);

    if (!quoteDoc.exists()) {
      return { success: false, error: "Quote not found" };
    }

    await updateDoc(quoteRef, {
      status: newStatus,
      updatedAt: serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error("❌ [Firebase] updateQuoteStatus error:", error);
    return { success: false, error: error.message };
  }
}

// ✅ Track order by ID and phone

export async function trackOrderByIdAndPhone(orderId, phone) {
  try {
    const orderRef = doc(db, "orders", orderId);
    const orderSnap = await getDoc(orderRef);

    if (orderSnap.exists()) {
      const orderData = orderSnap.data();
      // Check if the phone number matches the one associated with the order
      if (orderData.customer?.phone === phone) {
        const foundOrder = { id: orderSnap.id, ...orderData };
        console.log("✅ [Firebase] Order found for tracking!", foundOrder);
        return { success: true, data: foundOrder };
      } else {
        // Order found by ID, but phone number doesn't match
        console.warn(
          "⚠️ [Firebase] Order found by ID, but phone number mismatch.",
        );
        return {
          success: false,
          error: "Order not found or phone number does not match",
        };
      }
    } else {
      // Document with the given orderId does not exist
      console.log("❌ [Firebase] Order not found for tracking by ID.");
      return { success: false, error: "Order not found" };
    }
  } catch (error) {
    console.error("❌ [Firebase] trackOrderByIdAndPhone error:", error);
    return { success: false, error: error.message };
  }
}

// ✅ Fetch total orders count
export async function fetchTotalOrdersCount() {
  console.log("📊 [Firebase] Fetching total orders count...");

  try {
    const ordersSnapshot = await getDocs(collection(db, "orders"));
    const count = ordersSnapshot.size;

    console.log("✅ [Firebase] Total orders count:", count);
    return { success: true, data: count };
  } catch (error) {
    console.error("❌ [Firebase] fetchTotalOrdersCount error:", error);
    return { success: false, error: error.message };
  }
}

// ✅ Fetch total products count
export async function fetchTotalProductsCount() {
  console.log("📦 [Firebase] Fetching total products count...");

  try {
    const productsSnapshot = await getDocs(collection(db, "products"));
    const count = productsSnapshot.size;

    console.log("✅ [Firebase] Total products count:", count);
    return { success: true, data: count };
  } catch (error) {
    console.error("❌ [Firebase] fetchTotalProductsCount error:", error);
    return { success: false, error: error.message };
  }
}

// ✅ Fetch total quotes count
export async function fetchTotalQuotesCount() {
  console.log("💬 [Firebase] Fetching total quotes count...");

  try {
    const quotesSnapshot = await getDocs(collection(db, "quotes"));
    const count = quotesSnapshot.size;

    console.log("✅ [Firebase] Total quotes count:", count);
    return { success: true, data: count };
  } catch (error) {
    console.error("❌ [Firebase] fetchTotalQuotesCount error:", error);
    return { success: false, error: error.message };
  }
}

// ✅ Fetch low stock items count (stockCount < 10)
export async function fetchLowStockItemsCount() {
  console.log("⚠️ [Firebase] Fetching low stock items count...");

  try {
    const lowStockQuery = query(
      collection(db, "products"),
      where("stockCount", "<", 10),
    );
    const lowStockSnapshot = await getDocs(lowStockQuery);
    const count = lowStockSnapshot.size;

    console.log("✅ [Firebase] Low stock items count:", count);
    return { success: true, data: count };
  } catch (error) {
    console.error("❌ [Firebase] fetchLowStockItemsCount error:", error);
    return { success: false, error: error.message };
  }
}
