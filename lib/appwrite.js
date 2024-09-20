import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
  } from "react-native-appwrite";
  
  export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.fatma.internhub",
    projectId: "6672dc5c0000595c503a",
    storageId: "6672dd81002a863cd5d2",
    databaseId: "6672ddc8003c6068fbc3",
    userCollectionId: "6672de7700267b82393b",
    postCollectionId: "6672de2f00109df50248",
    saveCollectionId: "6672deb300066a53274a"
  };
  
  const client = new Client();
  
  client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);
  
  const account = new Account(client);
  const storage = new Storage(client);
  const avatars = new Avatars(client);
  const databases = new Databases(client);
  
 
export async function createUser(name, surname, username, email, password) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      name,
      surname,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        {
          accountId: newAccount.$id,
          email: email,
          name: name,
          surname: surname,
          username: username,
          avatarUrl: avatarUrl,
        }
      );
  
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }


export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
    
  } catch (error) {
    throw new Error(error)
  }
}


export async function getAccount() {
  try {

    const currentAccount = await account.get();
    return currentAccount;

  } catch (error) {
    throw new Error(error)
  }
}


export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}


export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error)
  }
}


export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}


export async function getUserPosts(userId) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.equal("creator", userId)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getLatestPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function savePost(postId) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error('User not logged in');
    console.log(postId)
    const savedPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.saveCollectionId,
      ID.unique(),
      {
        user: currentUser.$id,
        post: postId,
      }
    );

    return savedPost;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getSavedPosts() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error('User not logged in');

    const savedPosts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.saveCollectionId,
      [Query.equal("user", currentUser.$id)]
    );

    if (savedPosts.documents.length === 0) return [];
    const postIds = savedPosts.documents.map(doc => doc.post.$id); // post IDs listesi
  
    // Tek bir Query.equal kullanarak sorgu oluşturun
    const postQueries = Query.equal("$id", postIds);
    
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [postQueries] // Sorguyu tek bir dizide sarın
    );
    
    return posts.documents;
  } catch (error) {
    throw new Error(error.message);
  }}