import { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/storylogo-removebg-preview.png'
import {
    Box,
    Flex,
    Text,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    IconButton,
    Collapse,
    Popover,
    PopoverTrigger,
    Image,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NavLink = forwardRef(({ children, href }, ref) => (
    <Box
        as="a"
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={href}
        ref={ref}
    >
        {children}
    </Box>
));

NavLink.displayName = 'NavLink';
NavLink.propTypes = {
    children: PropTypes.node.isRequired,
    href: PropTypes.string.isRequired,
};

export default function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onToggle } = useDisclosure();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Retrieved Token:', token);
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <Box>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Toggle Navigation'}
                        display={{ md: 'none' }}
                        onClick={onToggle}
                    />
                    <Box height={"100%"}>
                        <Image height={"100%"} src={`${logo}`} alt="logo" />
                    </Box>
                    <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'center' }} alignItems={'center'}>
                        <DesktopNav display={{ base: 'none', md: 'flex' }} isLoggedIn={isLoggedIn} />
                    </Flex>
                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7} align={'center'}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>

                            {isLoggedIn ? (
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        rounded={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        minW={0}
                                    >
                                        <FaUserCircle size={24} />
                                    </MenuButton>
                                    <MenuList alignItems={'center'}>
                                        <br />
                                        <Box textAlign="center">
                                            <Text fontWeight="bold">{localStorage.getItem("username")}</Text>
                                        </Box>
                                        <br />
                                        <MenuDivider />
                                        <MenuItem>Your Servers</MenuItem>
                                        <MenuItem>Account Settings</MenuItem>
                                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                    </MenuList>
                                </Menu>
                            ) : (
                                <>
                                    <Button
                                        as={'a'}
                                        fontSize={'sm'}
                                        fontWeight={400}
                                        variant={'link'}
                                        href={'/login'}
                                    >
                                        Sign In
                                    </Button>
                                    <Button
                                        as={'a'}
                                        display={{ base: 'none', md: 'inline-flex' }}
                                        fontSize={'sm'}
                                        fontWeight={600}
                                        color={'white'}
                                        bg={'pink.400'}
                                        href={'/signup'}
                                        _hover={{
                                            bg: 'pink.300',
                                        }}
                                    >
                                        Sign Up
                                    </Button>
                                </>
                            )}
                        </Stack>
                    </Flex>
                </Flex>
            </Box>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav display={{ md: 'none' }} />
            </Collapse>
        </Box>
    );
}

const DesktopNav = ({ display }) => (
    <Stack direction={'row'} spacing={4} display={display}>
        {NAV_ITEMS.map((navItem) => (
            <Box key={navItem.label}>
                <Popover trigger={'hover'} placement={'bottom-start'}>
                    <PopoverTrigger>
                        <NavLink href={navItem.href}>{navItem.label}</NavLink>
                    </PopoverTrigger>
                </Popover>
            </Box>
        ))}

    </Stack>
);

DesktopNav.propTypes = {
    display: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
    isLoggedIn: PropTypes.bool.isRequired,
};

const MobileNav = ({ display }) => (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={display}>
        {NAV_ITEMS.map((navItem) => (
            <MobileNavItem key={navItem.label} {...navItem} />
        ))}
    </Stack>
);

MobileNav.propTypes = {
    display: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
};

const MobileNavItem = ({ label, href }) => (
    <Stack spacing={4}>
        <Box
            py={2}
            as="a"
            href={href ?? '#'}
            justifyContent="space-between"
            alignItems="center"
            _hover={{
                textDecoration: 'none',
            }}
        >
            <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
                {label}
            </Text>
        </Box>
    </Stack>
);

MobileNavItem.propTypes = {
    label: PropTypes.any.isRequired,
    href: PropTypes.string.isRequired,
};

const NAV_ITEMS = [
    {
        label: 'Home',
        href: '/home',
    },
    {
        label: 'Stories',
        href: '/story',
    },
    {
        label: 'My Stories',
        href: '/userstory',
    },
    {
        label: 'Add Story',
        href: '/addstory',
    },
    {
        label: 'Story Generator',
        href: '/storygenerator',
    }
];
