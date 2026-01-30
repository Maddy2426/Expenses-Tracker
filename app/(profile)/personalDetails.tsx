import { View, Text, Pressable, TextInput } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { router } from 'expo-router'
import { Back, EditProfile, Email, Logout, Password, UserName, Eye, EyeOff } from '@/src/assets'
import { useLocalAuthStore } from '@/src/store/localAuth.store'
import { FlashList } from '@shopify/flash-list'
import CustomBottomSheet, { CustomBottomSheetRef } from '@/src/components/General-Components/CustomBottomSheet'
import Button from '@/src/components/General-Components/Button'
import OtpInput from '@/src/components/authComponents/OtpInput'
import { Ionicons } from '@expo/vector-icons'

type ViewState = 'input' | 'otp' | 'success';

const PersonalDetails = () => {
    const { userEmail } = useLocalAuthStore();
    const bottomSheetRef = useRef<CustomBottomSheetRef>(null);
    const [title, setTitle] = useState<string>("");
    const [currentItem, setCurrentItem] = useState<string>("");
    const [viewState, setViewState] = useState<ViewState>('input');

    // Form states
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');

    // Password visibility
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Validation
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // OTP Timer
    const [otpTimer, setOtpTimer] = useState(0);

    useEffect(() => {
        let interval: any;
        if (otpTimer > 0) {
            interval = setInterval(() => {
                setOtpTimer(prev => prev > 0 ? prev - 1 : 0);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [otpTimer]);

    const data = [
        { id: "1", label: "Email", value: userEmail ?? "No email found", icon: Email },
        { id: "2", label: "Username", value: userEmail ?? "No username found", icon: UserName },
        { id: "3", label: "Name", value: userEmail ?? "No name found", icon: UserName },
        { id: "4", label: "Password", value: "********", icon: Password },
    ]

    const handleEdit = (item: { id: string, label: string }) => {
        setTitle(item.label);
        setCurrentItem(item.id);
        setViewState('input');
        // Reset all form states
        setEmail('');
        setUsername('');
        setName('');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setOtp('');
        setEmailError('');
        setUsernameError('');
        setPasswordError('');
        setOtpTimer(0);
        bottomSheetRef.current?.open();
    };

    const handleGetOtp = () => {
        if (currentItem === "1") {
            if (!email.trim()) {
                setEmailError("Email is required");
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setEmailError("Invalid email format");
                return;
            }
            setEmailError('');
            setOtpTimer(20); // 20 seconds countdown
            setViewState('otp');
        }
    };

    const handleVerifyOtp = () => {
        if (otp.length === 4) {
            // Simulate verification
            setTimeout(() => {
                setViewState('success');
            }, 500);
        }
    };

    const handleUpdate = () => {
        if (currentItem === "2") {
            if (!username.trim()) {
                setUsernameError("Username is required");
                return;
            }
            if (!/^[a-zA-Z0-9]+$/.test(username)) {
                setUsernameError("Only letters and numbers allowed. No spaces.");
                return;
            }
            // Simulate username check
            if (username === "heisenberg") {
                setUsernameError("Username already taken");
                return;
            }
            setUsernameError('');
            setViewState('success');
        } else if (currentItem === "3") {
            if (!name.trim()) {
                return;
            }
            setViewState('success');
        } else if (currentItem === "4") {
            if (!currentPassword || !newPassword || !confirmPassword) {
                setPasswordError("All fields are required");
                return;
            }
            if (newPassword.length < 8) {
                setPasswordError("Password must be at least 8 characters");
                return;
            }
            if (newPassword !== confirmPassword) {
                setPasswordError("Passwords do not match");
                return;
            }
            setPasswordError('');
            setViewState('success');
        }
    };

    const handleClose = () => {
        bottomSheetRef.current?.close();
        setViewState('input');
    };

    const handleResendOtp = () => {
        if (otpTimer === 0) {
            setOtpTimer(20);
            setOtp('');
        }
    };

    const renderBottomSheetContent = () => {
        if (viewState === 'success') {
            return (
                <View className='flex-1 items-center justify-center pb-8 pt-[68px]'>
                    <View className='w-20 h-20 bg-success-400 rounded-full items-center justify-center mb-4'>
                        <Ionicons name="checkmark" size={40} color="white" />
                    </View>
                    <Text className='text-titlelarge font-bold text-dark mb-2'>{title} changed</Text>
                    <Text className='text-bodymedium font-normal text-subtext text-center mb-8'>
                        Your {title.toLowerCase()} has been changed successfully.
                    </Text>
                    <Button label="Close" onPress={handleClose} fullWidth />
                </View>
            );
        }

        if (viewState === 'otp' && currentItem === "1") {
            return (
                <View className='flex-1 pb-8'>
                    <Text className='text-bodymedium font-normal text-subtext mb-6 text-center'>
                        We&apos;ve sent a code to {email}
                    </Text>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        length={4}
                        onComplete={handleVerifyOtp}
                    />
                    <View className='flex-row items-center justify-center mt-6 mb-8'>
                        <Text className='text-bodysmall font-normal text-subtext'>
                            Send code again{' '}
                        </Text>
                        {otpTimer > 0 ? (
                            <Text className='text-bodysmall font-normal text-subtext'>
                                {String(Math.floor(otpTimer / 60)).padStart(2, '0')}:{String(otpTimer % 60).padStart(2, '0')}
                            </Text>
                        ) : (
                            <Pressable onPress={handleResendOtp}>
                                <Text className='text-bodysmall font-medium text-secondary-400'>Resend</Text>
                            </Pressable>
                        )}
                    </View>
                    <Button
                        label="Verify"
                        onPress={handleVerifyOtp}
                        disabled={otp.length !== 4}
                        fullWidth
                    />
                </View>
            );
        }

        // Input view
        return (
            <View className='flex-1 pb-8'>
                {currentItem === "1" && (
                    <>
                        <Text className='text-titlesmall font-normal text-dark mb-2'>Enter New Email address</Text>
                        <TextInput
                            className={`text-titlesmall font-medium text-dark border rounded-lg px-4 py-3 mb-2 ${emailError ? 'border-danger-400' : 'border-accent'}`}
                            placeholder='example@gmail.com'
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                setEmailError('');
                            }}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        {emailError ? (
                            <Text className='text-bodysmall font-normal text-danger-400 mb-4'>{emailError}</Text>
                        ) : null}
                        <Button label="Get OTP" onPress={handleGetOtp} fullWidth />
                    </>
                )}

                {currentItem === "2" && (
                    <>
                        <Text className='text-titlesmall font-normal text-dark mb-2'>Enter New Username</Text>
                        <TextInput
                            className={`text-titlesmall font-medium text-dark border rounded-lg px-4 py-3 mb-2 ${usernameError ? 'border-danger-400' : 'border-accent'}`}
                            placeholder='heisenberg'
                            value={username}
                            onChangeText={(text) => {
                                setUsername(text);
                                setUsernameError('');
                            }}
                            autoCapitalize="none"
                        />
                        {usernameError ? (
                            <Text className='text-bodysmall font-normal text-danger-400 mb-2'>{usernameError}</Text>
                        ) : null}
                        <Text className='text-bodysmall font-normal text-subtext mb-4'>
                            Only letters and numbers allowed. No spaces.
                        </Text>
                        <Button label="Update" onPress={handleUpdate} fullWidth />
                    </>
                )}

                {currentItem === "3" && (
                    <>
                        <Text className='text-titlesmall font-normal text-dark mb-2'>Enter New Name</Text>
                        <TextInput
                            className='text-titlesmall font-medium text-dark border border-accent rounded-lg px-4 py-3 mb-4'
                            placeholder='acbd'
                            value={name}
                            onChangeText={setName}
                        />
                        <Button label="Update" onPress={handleUpdate} fullWidth />
                    </>
                )}

                {currentItem === "4" && (
                    <>
                        <Text className='text-titlesmall font-normal text-dark mb-2'>Current Password</Text>
                        <View className='relative mb-4'>
                            <TextInput
                                className='text-titlesmall font-medium text-dark border border-accent rounded-lg px-4 py-3 pr-12'
                                placeholder='example@gmail.com'
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                                secureTextEntry={!showCurrentPassword}
                            />
                            <Pressable
                                className='absolute right-4 top-3.5'
                                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                            >
                                {showCurrentPassword ? <EyeOff width={20} height={20} /> : <Eye width={20} height={20} />}
                            </Pressable>
                        </View>

                        <Text className='text-titlesmall font-normal text-dark mb-2'>New Password</Text>
                        <View className='relative mb-4'>
                            <TextInput
                                className='text-titlesmall font-medium text-dark border border-accent rounded-lg px-4 py-3 pr-12'
                                placeholder='must be 8 characters'
                                value={newPassword}
                                onChangeText={setNewPassword}
                                secureTextEntry={!showNewPassword}
                            />
                            <Pressable
                                className='absolute right-4 top-3.5'
                                onPress={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? <EyeOff width={20} height={20} /> : <Eye width={20} height={20} />}
                            </Pressable>
                        </View>

                        <Text className='text-titlesmall font-normal text-dark mb-2'>Confirm New Password</Text>
                        <View className='relative mb-4'>
                            <TextInput
                                className='text-titlesmall font-medium text-dark border border-accent rounded-lg px-4 py-3 pr-12'
                                placeholder='must be 8 characters'
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!showConfirmPassword}
                            />
                            <Pressable
                                className='absolute right-4 top-3.5'
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeOff width={20} height={20} /> : <Eye width={20} height={20} />}
                            </Pressable>
                        </View>

                        {passwordError ? (
                            <Text className='text-bodysmall font-normal text-danger-400 mb-4'>{passwordError}</Text>
                        ) : null}

                        <Button label="Update Password" onPress={handleUpdate} fullWidth />
                    </>
                )}
            </View>
        );
    };

    const renderItem = ({ item }: { item: { id: string, label: string, value: string, icon: React.ComponentType<{ width?: number; height?: number }> } }) => {
        const Icon = item.icon;
        return (
            <View>
                <View className='flex-row items-center justify-between pb-5'>
                    <View className='gap-2'>
                        <View className="flex-row items-center gap-1">
                            <Icon width={16} height={16} />
                            <Text className='text-labelsmall font-normal text-dark'>{item.label}</Text>
                        </View>
                        <Text className='text-bodymedium font-normal text-dark'>{item.value}</Text>
                    </View>
                    <Pressable onPress={() => handleEdit(item)}>
                        <EditProfile width={16} height={16} />
                    </Pressable>
                </View>
                {item.id === "4" ? (
                    <Text className='text-subtext text-bodysmall font-medium -mt-4'>Last changed: 15/08/2025</Text>
                ) : (
                    <View className='w-full pb-3 mb-5' style={{ borderBottomWidth: 0.5, borderBottomColor: '#E5E5E5' }} />
                )}
            </View>
        )
    }

    return (
        <View className="flex-1 p-6 pt-5">
            <View className="flex-row items-center justify-between pb-6 gap-3">
                <View className="flex-row items-center gap-2">
                    <Pressable onPress={() => router.back()}>
                        <Back width={32} height={32} />
                    </Pressable>
                    <Text className="text-titlelarge font-normal text-dark">
                        Personal Details
                    </Text>
                </View>
                <Pressable onPress={() => router.push("/(auth)")} className='flex-row items-center gap-1.5'>
                    <Text className='text-bodymedium font-normal text-warning-300'>Sign-Out</Text>
                    <Logout width={16} height={16} />
                </Pressable>
            </View>
            <View className='flex-1 border border-subtext rounded-xl p-3 mb-16' >
                <FlashList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <View className='flex-1' />
            <CustomBottomSheet
                ref={bottomSheetRef}
                title={viewState === 'success' ? '' : `Update ${title}`}
                snapPoints={viewState === 'success' ? ['40%'] : ['25%']}
                doubleButton={false}
            >
                <View className='flex-1 px-6 pt-[68px]'>
                    {renderBottomSheetContent()}
                </View>
            </CustomBottomSheet>
        </View>
    )
}

export default PersonalDetails