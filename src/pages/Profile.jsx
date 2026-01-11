import { useSelector } from 'react-redux';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Calendar, Shield, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Please Login</CardTitle>
            <CardDescription>You need to be logged in to view your profile</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/login')}>Go to Login</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getInitials = (username) => {
    return username?.charAt(0).toUpperCase() || 'U';
  };

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-6xl min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">My Profile</h1>
        <p className="text-muted-foreground">Manage your account information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`} alt={user?.username} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {getInitials(user?.username)}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-2xl">{user?.username || 'User'}</CardTitle>
            <CardDescription>
              {user?.email || `${user?.username}@example.com`}
            </CardDescription>
            <div className="mt-4">
              <Badge variant={user?.role === 'admin' ? 'default' : 'secondary'} className="text-sm px-3 py-1">
                {user?.role === 'admin' ? 'Administrator' : 'Customer'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your account details and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Username</p>
                  <p className="text-lg font-semibold">{user?.username || 'Not set'}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-lg font-semibold">{user?.email || `${user?.username}@example.com`}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Account Type</p>
                  <p className="text-lg font-semibold capitalize">{user?.role || 'user'}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                  <p className="text-lg font-semibold">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1">
                Change Password
              </Button>
              <Button variant="outline" className="flex-1">
                Update Email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" onClick={() => navigate('/orders')}>
              <span className="text-lg font-semibold">View Orders</span>
              <span className="text-xs text-muted-foreground">Check your order history</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" onClick={() => navigate('/cart')}>
              <span className="text-lg font-semibold">Shopping Cart</span>
              <span className="text-xs text-muted-foreground">Review your cart items</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" onClick={() => navigate('/settings')}>
              <span className="text-lg font-semibold">Settings</span>
              <span className="text-xs text-muted-foreground">Manage preferences</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
