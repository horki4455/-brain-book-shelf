import { auth } from '@/plugins/firebase'

export default async function ({ store }) {
  const user = await new Promise((resolve) => {
    auth.onAuthStateChanged((user) => {
      resolve(user)
    })
  })
  if (user) {
    console.log(user)
    store.commit('setUserUid', user.uid)
    store.commit('setUserName', user.displayName)
  }
}
// SPAだとまあいけるが、SSRだと遅いらしいので結局クッキーのがいいかも。
//初期表示時に渡されるものが引数storeへ格納
//onAuthStateChangedは非同期なのでミドルウェアに弾かれた後に復元処理が走っている
//promisを返すものしかawaitを使えないため、今回はasyncとawaitが使えなかった。
//やってることは普通の非同期処理
//ログインできた場合は、onAuthStateChanged（ユーザー）がいない場合はundefindで抜けているはず。
